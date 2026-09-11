#!/usr/bin/env node
// Resincroniza este repo desde ~/.claude: copia skills y plugins instalados,
// los agrupa por categoria, y regenera catalog.json + README.md.
//
//   node ./scripts/sync.mjs
//
// Una skill o plugin nuevo que no este en los mapas de abajo cae en la
// categoria "other"; anadelo al mapa correspondiente y vuelve a ejecutar.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLAUDE = path.join(os.homedir(), '.claude');

// ---------------------------------------------------------------- categorias
const SKILL_CATS = {
  'apple-design': 'design-ui', 'bencium-innovative-ux-designer': 'design-ui',
  'design-system': 'design-ui', 'emil-design-eng': 'design-ui', 'impeccable': 'design-ui',
  'interface-design': 'design-ui', 'ui-styling': 'design-ui', 'web-design-guidelines': 'design-ui',
  'pick-ui-library': 'design-ui', 'prototype': 'design-ui',
  'animation-vocabulary': 'animation-motion', 'find-animation-opportunities': 'animation-motion',
  'improve-animations': 'animation-motion', 'review-animations': 'animation-motion',
  'cache-components': 'frontend-frameworks', 'next-best-practices': 'frontend-frameworks',
  'react-best-practices': 'frontend-frameworks',
  'cyber-neo': 'security',
  'pinokio': 'tools',
};

const PLUGIN_CATS = {
  'claude-seo': 'seo', 'claude-blog': 'seo',
  'frontend-design': 'design-ui', 'ui-ux-pro-max': 'design-ui',
  'tailwind-v4-shadcn': 'design-ui', 'meta-skills': 'design-ui',
  'motion-framer': 'animation-3d', 'gsap-skills': 'animation-3d', 'gsap-scrolltrigger': 'animation-3d',
  'core-3d-animation': 'animation-3d', 'animation-components': 'animation-3d',
  'extended-3d-scroll': 'animation-3d', 'authoring-motion': 'animation-3d',
  'threejs-webgl': 'animation-3d', 'react-three-fiber': 'animation-3d',
  'babylonjs-engine': 'animation-3d', 'locomotive-scroll': 'animation-3d', 'barba-js': 'animation-3d',
  'pixijs-2d': 'animation-3d', 'lottie-animations': 'animation-3d', 'animejs': 'animation-3d',
  'spline-interactive': 'animation-3d', 'rive-interactive': 'animation-3d',
  'accesslint': 'accessibility',
  'playwright': 'testing', 'pw': 'testing',
  'prisma': 'database',
  'typescript-lsp': 'lang-tooling', 'php-lsp': 'lang-tooling',
  'mattpocock-skills': 'dev-workflow',
  'semgrep': 'security', 'security-guidance': 'security',
  'modern-web-guidance': 'frontend-frameworks',
  'commit-commands': 'dev-workflow', 'pr-review-toolkit': 'dev-workflow',
  'agent-sdk-dev': 'dev-workflow', 'feature-dev': 'dev-workflow',
  'document-skills': 'documents',
  'claude-security': 'security',
  'andrej-karpathy-skills': 'ai-learning',
  'example-skills': 'examples',
  'core-skills': 'video-media',
};

const CAT_LABELS = {
  'design-ui': 'Diseno y UI',
  'animation-motion': 'Animacion y motion',
  'animation-3d': 'Animacion, 3D y scroll',
  'frontend-frameworks': 'Frameworks frontend',
  'database': 'Bases de datos',
  'lang-tooling': 'Servidores de lenguaje (LSP)',
  'seo': 'SEO',
  'accessibility': 'Accesibilidad',
  'testing': 'Testing y QA',
  'dev-workflow': 'Workflow de desarrollo',
  'documents': 'Documentos (docx, xlsx, pptx, pdf)',
  'security': 'Seguridad',
  'video-media': 'Video y media',
  'ai-learning': 'IA y aprendizaje',
  'examples': 'Ejemplos y plantillas',
  'tools': 'Herramientas',
  'other': 'Otros',
};

// Plugins cuya carpeta en el repo se mantiene a mano (marketplace local) y
// por tanto no se sobreescriben desde la cache de ~/.claude.
// 'pw' (playwright-pro) aun no esta instalado: ver su _PENDIENTE.md.
const PINNED = new Set(['core-skills', 'pw']);

// Repo de GitHub del que salio cada marketplace local (no figura en
// known_marketplaces.json porque alli consta como ruta de directorio).
const LOCAL_ORIGINS = {
  hyperframes: 'heygen-com/hyperframes',
  'playwright-pro': 'alirezarezvani/claude-skills',
};

// ------------------------------------------------------------------ utilidades
function frontmatter(dir) {
  const f = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(f)) return {};
  const m = fs.readFileSync(f, 'utf8').match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const descM = m[1].match(/^description:[ \t]*([\s\S]*?)(?=\n[a-zA-Z_-]+:|$)/m);
  return descM
    ? { description: descM[1].trim().replace(/\s+/g, ' ').replace(/^["']|["']$/g, '') }
    : {};
}

function countSkills(absDir) {
  let n = 0;
  const walk = (d) => {
    let ents = [];
    try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) walk(path.join(d, e.name));
      else if (e.name === 'SKILL.md') n++;
    }
  };
  walk(absDir);
  return n;
}

function pluginDesc(relPath, pluginName) {
  for (const rel of ['.claude-plugin/plugin.json', 'plugin.json']) {
    const f = path.join(REPO, relPath, rel);
    if (!fs.existsSync(f)) continue;
    try {
      const j = JSON.parse(fs.readFileSync(f, 'utf8'));
      if (j.description) return j.description;
    } catch { /* sigue */ }
  }
  const mf = path.join(REPO, relPath, '.claude-plugin/marketplace.json');
  if (fs.existsSync(mf)) {
    try {
      const j = JSON.parse(fs.readFileSync(mf, 'utf8'));
      const hit = (j.plugins ?? []).find((x) => x.name === pluginName);
      if (hit?.description) return hit.description;
    } catch { /* sigue */ }
  }
  // Ultimo recurso (p.ej. los plugins LSP, que solo traen README):
  // el primer parrafo de texto del README, saltando titulos y badges.
  const rm = path.join(REPO, relPath, 'README.md');
  if (fs.existsSync(rm)) {
    const para = fs.readFileSync(rm, 'utf8')
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#') && !p.startsWith('!') && !p.startsWith('<'));
    if (para) return para.replace(/\s+/g, ' ');
  }
  return '';
}

// ------------------------------------------------------------- 1. skills sueltas
const catalog = { generatedAt: new Date().toISOString(), skills: [], plugins: [] };
const skillsSrc = path.join(CLAUDE, 'skills');

for (const name of fs.readdirSync(skillsSrc)) {
  const src = path.join(skillsSrc, name);
  if (!fs.statSync(src).isDirectory()) continue;
  const cat = SKILL_CATS[name] ?? 'other';
  const rel = `skills/${cat}/${name}`;
  const dest = path.join(REPO, rel);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  catalog.skills.push({
    name, category: cat, path: rel,
    description: frontmatter(src).description ?? '',
    skillCount: countSkills(dest),
    origin: '~/.claude/skills',
  });
  console.log(`skill  ${cat.padEnd(20)} ${name}`);
}

// ----------------------------------------------------------------- 2. plugins
const inst = JSON.parse(fs.readFileSync(path.join(CLAUDE, 'plugins', 'installed_plugins.json'), 'utf8'));
const mkts = JSON.parse(fs.readFileSync(path.join(CLAUDE, 'plugins', 'known_marketplaces.json'), 'utf8'));

for (const [key, entries] of Object.entries(inst.plugins)) {
  const [pname, mname] = key.split('@');
  const e = entries[0];
  const cat = PLUGIN_CATS[pname] ?? 'other';
  const pinned = PINNED.has(pname);
  // core-skills@hyperframes vive en plugins/video-media/hyperframes (nombre del marketplace)
  const folder = pinned ? mname : pname;
  const rel = `plugins/${cat}/${folder}`;
  const dest = path.join(REPO, rel);
  const src = e.installPath.split('\\').join('/');

  if (!pinned) {
    if (!fs.existsSync(src)) { console.log(`SKIP (sin cache) ${key}`); continue; }
    fs.rmSync(dest, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  } else if (!fs.existsSync(dest)) {
    console.log(`SKIP (carpeta fijada ausente) ${key}`);
    continue;
  }

  const meta = {
    plugin: pname,
    marketplace: mname,
    marketplaceRepo: mkts[mname]?.source?.repo ?? LOCAL_ORIGINS[mname] ?? null,
    version: e.version,
    gitCommitSha: e.gitCommitSha ?? null,
    installedAt: e.installedAt,
    lastUpdated: e.lastUpdated,
    installCommand: `claude plugin install ${pname}@${mname}`,
    localMarketplace: pinned || undefined,
  };
  fs.writeFileSync(path.join(dest, '_source.json'), JSON.stringify(meta, null, 2));
  catalog.plugins.push({
    ...meta,
    category: cat,
    path: rel,
    description: pluginDesc(rel, pname),
    skillCount: countSkills(dest),
  });
  console.log(`plugin ${cat.padEnd(20)} ${pname} (${mname})${pinned ? ' [local]' : ''}`);
}

catalog.sourcesScanned = [
  '~/.claude/skills (skills standalone)',
  '~/.claude/plugins/cache + installed_plugins.json (plugins de marketplace)',
  '~/.claude/plugins/known_marketplaces.json (origenes en GitHub)',
  'github.com/heygen-com/hyperframes (marketplace local en plugins/video-media)',
];
fs.writeFileSync(path.join(REPO, 'catalog.json'), JSON.stringify(catalog, null, 2));

// ------------------------------------------------------------------ 3. README
const FENCE = '```';
const trunc = (s, n) => {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/[,;.\s]+$/, '')}\u2026` : t;
};
const byCat = (arr) => {
  const m = {};
  for (const x of arr) (m[x.category] ??= []).push(x);
  for (const k of Object.keys(m)) m[k].sort((a, b) => (a.name ?? a.plugin).localeCompare(b.name ?? b.plugin));
  return m;
};
const order = Object.keys(CAT_LABELS);
const sortCats = (m) => Object.keys(m).sort((a, b) => order.indexOf(a) - order.indexOf(b));
const sCats = byCat(catalog.skills);
const pCats = byCat(catalog.plugins);

const L = [];
L.push('# Skills y plugins instalados', '');
L.push('Repositorio espejo de todas las **skills** y **plugins** de Claude Code instalados en esta maquina, agrupados por tipo y por tematica. Sirve como copia de seguridad, inventario y script de reinstalacion en una maquina nueva.', '');
L.push('| | Cantidad |', '|---|---|');
L.push(`| Skills standalone | ${catalog.skills.length} |`);
L.push(`| Plugins de marketplace | ${catalog.plugins.length} |`);
L.push(`| SKILL.md totales | ${[...catalog.skills, ...catalog.plugins].reduce((a, x) => a + (x.skillCount ?? 0), 0)} |`);
L.push(`| Marketplaces de origen | ${new Set(catalog.plugins.map((p) => p.marketplaceRepo).filter(Boolean)).size} |`, '');
L.push(`Ultima sincronizacion: ${catalog.generatedAt.slice(0, 10)}`, '');
L.push('## Estructura', '', FENCE);
L.push('skills/     <- skills sueltas, copiadas de ~/.claude/skills');
for (const c of sortCats(sCats)) L.push(`  ${`${c}/`.padEnd(24)}${CAT_LABELS[c] ?? c} (${sCats[c].length})`);
L.push('plugins/    <- plugins de marketplace, copiados de ~/.claude/plugins/cache');
for (const c of sortCats(pCats)) L.push(`  ${`${c}/`.padEnd(24)}${CAT_LABELS[c] ?? c} (${pCats[c].length})`);
L.push('scripts/    <- reinstalar y resincronizar');
L.push('catalog.json<- inventario completo en JSON');
L.push(FENCE, '');
L.push('Cada carpeta de plugin lleva un `_source.json` con su marketplace, version, commit y el comando exacto de instalacion.', '');

L.push('## Skills standalone', '');
for (const c of sortCats(sCats)) {
  L.push(`### ${CAT_LABELS[c] ?? c}`, '', '| Skill | Para que sirve |', '|---|---|');
  for (const s of sCats[c]) L.push(`| [\`${s.name}\`](${s.path}) | ${trunc(s.description, 170) || '\u2014'} |`);
  L.push('');
}

L.push('## Plugins', '');
for (const c of sortCats(pCats)) {
  L.push(`### ${CAT_LABELS[c] ?? c}`, '', '| Plugin | Origen | Version | Skills | Descripcion |', '|---|---|---|---|---|');
  for (const p of pCats[c]) {
    const org = p.marketplaceRepo ? `[${p.marketplaceRepo}](https://github.com/${p.marketplaceRepo})` : p.marketplace;
    L.push(`| [\`${p.plugin}\`](${p.path}) | ${org} | \`${p.version}\` | ${p.skillCount || '\u2014'} | ${trunc(p.description, 110) || '\u2014'} |`);
  }
  L.push('');
}

L.push('## Reinstalar en una maquina nueva', '', FENCE + 'powershell');
L.push('git clone https://github.com/webcreatorms-source/skills.git');
L.push('cd skills');
L.push('');
L.push('# marketplaces + plugins desde sus origenes');
L.push('pwsh ./scripts/install-all.ps1');
L.push('');
L.push('# skills sueltas a ~/.claude/skills');
L.push('pwsh ./scripts/install-all.ps1 -Skills');
L.push(FENCE, '');
L.push('## Resincronizar este repo', '', 'Tras instalar o actualizar skills en Claude Code:', '', FENCE + 'powershell');
L.push('node ./scripts/sync.mjs');
L.push(FENCE, '');
L.push('Vuelve a copiar todo desde `~/.claude`, regenera `catalog.json` y este README.', '');
L.push('## Notas de procedencia', '');
for (const s of catalog.sourcesScanned) L.push(`- ${s}`);
L.push('- Las copias en `~/.agents`, `~/.hermes` y `~/.gemini` son espejos del mismo contenido (la de `.gemini` es la variante de `impeccable` para Gemini, misma version) \u2014 no se duplican aqui.');
L.push('- De `anthropic-agent-skills` hay varias versiones en cache; solo se guarda la instalada.');
L.push('- De `heygen-com/hyperframes` solo se guarda `skills/` + `.claude-plugin/` (19 MB); el monorepo completo pesa 1.4 GB.', '');

fs.writeFileSync(path.join(REPO, 'README.md'), L.join('\n'));
console.log(`\nOK  skills=${catalog.skills.length}  plugins=${catalog.plugins.length}`);
