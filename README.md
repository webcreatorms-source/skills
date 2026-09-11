# Skills y plugins instalados

Repositorio espejo de todas las **skills** y **plugins** de Claude Code instalados en esta maquina, agrupados por tipo y por tematica. Sirve como copia de seguridad, inventario y script de reinstalacion en una maquina nueva.

| | Cantidad |
|---|---|
| Skills standalone | 19 |
| Plugins de marketplace | 37 |
| SKILL.md totales | 177 |
| Marketplaces de origen | 10 |

Ultima sincronizacion: 2026-09-11

## Estructura

```
skills/     <- skills sueltas, copiadas de ~/.claude/skills
  design-ui/              Diseno y UI (10)
  animation-motion/       Animacion y motion (4)
  frontend-frameworks/    Frameworks frontend (3)
  security/               Seguridad (1)
  tools/                  Herramientas (1)
plugins/    <- plugins de marketplace, copiados de ~/.claude/plugins/cache
  design-ui/              Diseno y UI (4)
  animation-3d/           Animacion, 3D y scroll (17)
  frontend-frameworks/    Frameworks frontend (1)
  database/               Bases de datos (1)
  seo/                    SEO (1)
  accessibility/          Accesibilidad (1)
  testing/                Testing y QA (1)
  dev-workflow/           Workflow de desarrollo (4)
  documents/              Documentos (docx, xlsx, pptx, pdf) (1)
  security/               Seguridad (3)
  video-media/            Video y media (1)
  ai-learning/            IA y aprendizaje (1)
  examples/               Ejemplos y plantillas (1)
scripts/    <- reinstalar y resincronizar
catalog.json<- inventario completo en JSON
```

Cada carpeta de plugin lleva un `_source.json` con su marketplace, version, commit y el comando exacto de instalacion.

## Skills standalone

### Diseno y UI

| Skill | Para que sirve |
|---|---|
| [`apple-design`](skills/design-ui/apple-design) | Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/… |
| [`bencium-innovative-ux-designer`](skills/design-ui/bencium-innovative-ux-designer) | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Gen… |
| [`design-system`](skills/design-ui/design-system) | Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic→component), CSS variables, spacing/typography scales, componen… |
| [`emil-design-eng`](skills/design-ui/emil-design-eng) | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great. |
| [`impeccable`](skills/design-ui/impeccable) | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve… |
| [`interface-design`](skills/design-ui/interface-design) | Craft-first interface design for dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces, and interactive products. Use when designing, building, rev… |
| [`pick-ui-library`](skills/design-ui/pick-ui-library) | Pick the right library for a given frontend task from a curated, opinionated list — numbers, OTP inputs, charts, command menus, virtualization, drag and drop, toasts, st… |
| [`prototype`](skills/design-ui/prototype) | Build multiple genuinely different versions of a UI piece you describe, rendered behind a visual picker so you can flip through them live and promote the one that feels… |
| [`ui-styling`](skills/design-ui/ui-styling) | Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual design… |
| [`web-design-guidelines`](skills/design-ui/web-design-guidelines) | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against b… |

### Animacion y motion

| Skill | Para que sirve |
|---|---|
| [`animation-vocabulary`](skills/animation-motion/animation-vocabulary) | Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the bouncy thing when a popover opens" → Pop in; "the iO… |
| [`find-animation-opportunities`](skills/animation-motion/find-animation-opportunities) | Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it proposes motion with exact values, it does not impl… |
| [`improve-animations`](skills/animation-motion/improve-animations) | Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-contained implementation plans for other agents (or c… |
| [`review-animations`](skills/animation-motion/review-animations) | Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; approval is earned. |

### Frameworks frontend

| Skill | Para que sirve |
|---|---|
| [`cache-components`](skills/frontend-frameworks/cache-components) | Expert guidance for Next.js Cache Components and Partial Prerendering (PPR). Use when implementing 'use cache' directive, configuring cache lifetimes with cacheLife(), t… |
| [`next-best-practices`](skills/frontend-frameworks/next-best-practices) | Next.js App Router best practices covering file conventions, RSC boundaries, async APIs, data patterns, hydration errors, metadata, route handlers, image/font optimizati… |
| [`react-best-practices`](skills/frontend-frameworks/react-best-practices) | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to en… |

### Seguridad

| Skill | Para que sirve |
|---|---|
| [`cyber-neo`](skills/security/cyber-neo) | > |

### Herramientas

| Skill | Para que sirve |
|---|---|
| [`pinokio`](skills/tools/pinokio) | Discover, launch, and use apps and tools for the current task. |

## Plugins

### Diseno y UI

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`frontend-design`](plugins/design-ui/frontend-design) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | 1 | Frontend design skill for UI/UX implementation |
| [`meta-skills`](plugins/design-ui/meta-skills) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 2 | Integration patterns and modern web design guidelines for building cohesive 3D/animation experiences |
| [`tailwind-v4-shadcn`](plugins/design-ui/tailwind-v4-shadcn) | [secondsky/claude-skills](https://github.com/secondsky/claude-skills) | `3.3.1` | 1 | Production-tested setup for Tailwind CSS v4 with shadcn/ui, Vite, and React. Use when: initializing React pro… |
| [`ui-ux-pro-max`](plugins/design-ui/ui-ux-pro-max) | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `2.11.0` | 13 | UI/UX design intelligence. Searchable local database with 84 styles, 192 palettes, 74 font pairings, 25 chart… |

### Animacion, 3D y scroll

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`animation-components`](plugins/animation-3d/animation-components) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 5 | Comprehensive animation and component libraries with React Spring, Magic UI, React Bits, AOS, Anime.js, and L… |
| [`animejs`](plugins/animation-3d/animejs) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Versatile JavaScript animation engine for DOM, CSS, SVG, and JavaScript objects. Use when creating timeline-b… |
| [`authoring-motion`](plugins/animation-3d/authoring-motion) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 4 | Professional 3D authoring and motion graphics pipeline with Blender, Spline, Rive, and Substance 3D |
| [`babylonjs-engine`](plugins/animation-3d/babylonjs-engine) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Comprehensive skill for Babylon.js 3D web rendering engine. Use this skill when building real-time 3D experie… |
| [`barba-js`](plugins/animation-3d/barba-js) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Page transitions library for creating fluid, smooth transitions between website pages. Use this skill when im… |
| [`core-3d-animation`](plugins/animation-3d/core-3d-animation) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 5 | Complete core 3D and animation stack with Three.js, GSAP, React Three Fiber, Framer Motion, and Babylon.js |
| [`extended-3d-scroll`](plugins/animation-3d/extended-3d-scroll) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 6 | Extended 3D graphics and smooth scroll stack with A-Frame, lightweight effects, PlayCanvas, PixiJS, Locomotiv… |
| [`gsap-scrolltrigger`](plugins/animation-3d/gsap-scrolltrigger) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Comprehensive skill for GSAP (GreenSock Animation Platform) and ScrollTrigger plugin. Use this skill when cre… |
| [`gsap-skills`](plugins/animation-3d/gsap-skills) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | `1.0.0` | 8 | Official GSAP skills for Claude, Cursor, and other AI agents — animations, timelines, ScrollTrigger, plugins… |
| [`locomotive-scroll`](plugins/animation-3d/locomotive-scroll) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Comprehensive skill for Locomotive Scroll smooth scrolling library with parallax effects, viewport detection… |
| [`lottie-animations`](plugins/animation-3d/lottie-animations) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | After Effects animation rendering for web and React applications. Use this skill when implementing Lottie ani… |
| [`motion-framer`](plugins/animation-3d/motion-framer) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Modern animation library for React and JavaScript. Create smooth, production-ready animations with motion com… |
| [`pixijs-2d`](plugins/animation-3d/pixijs-2d) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Fast, lightweight 2D rendering engine for creating interactive graphics, particle effects, and canvas-based a… |
| [`react-three-fiber`](plugins/animation-3d/react-three-fiber) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Build declarative 3D scenes with React Three Fiber (R3F) - a React renderer for Three.js. Use when building i… |
| [`rive-interactive`](plugins/animation-3d/rive-interactive) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | State machine-based vector animation with runtime interactivity and web integration. Use this skill when crea… |
| [`spline-interactive`](plugins/animation-3d/spline-interactive) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Browser-based 3D design tool with visual editor, animation, and web export. Use this skill when creating 3D s… |
| [`threejs-webgl`](plugins/animation-3d/threejs-webgl) | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `1.0.0` | 1 | Comprehensive skill for Three.js 3D web development. Use this skill when building interactive 3D scenes, WebG… |

### Frameworks frontend

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`modern-web-guidance`](plugins/frontend-frameworks/modern-web-guidance) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `0.0.187` | 2 | Keep your coding agent up to date with the latest web best practices |

### Bases de datos

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`prisma`](plugins/database/prisma) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `815dbc4a045a` | — | Prisma MCP integration for Postgres database management, schema migrations, SQL queries, and connection strin… |

### SEO

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`claude-seo`](plugins/seo/claude-seo) | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | `2.2.0` | 33 | Comprehensive SEO analysis plugin for Claude Code. 25 sub-skills (21 core + 1 orchestrator + 1 framework + 2… |

### Accesibilidad

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`accesslint`](plugins/accessibility/accesslint) | [accesslint/skills](https://github.com/accesslint/skills) | `0.8.0` | 3 | — |

### Testing y QA

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`playwright`](plugins/testing/playwright) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | — | Browser automation and end-to-end testing MCP server by Microsoft. Enables Claude to interact with web pages… |

### Workflow de desarrollo

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`agent-sdk-dev`](plugins/dev-workflow/agent-sdk-dev) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | — | Claude Agent SDK Development Plugin |
| [`commit-commands`](plugins/dev-workflow/commit-commands) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | — | Streamline your git workflow with simple commands for committing, pushing, and creating pull requests |
| [`feature-dev`](plugins/dev-workflow/feature-dev) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | — | Comprehensive feature development workflow with specialized agents for codebase exploration, architecture des… |
| [`pr-review-toolkit`](plugins/dev-workflow/pr-review-toolkit) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `3deb821cb71c` | — | Comprehensive PR review agents specializing in comments, tests, error handling, type design, code quality, an… |

### Documentos (docx, xlsx, pptx, pdf)

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`document-skills`](plugins/documents/document-skills) | [anthropics/skills](https://github.com/anthropics/skills) | `34040c9c5685` | 20 | Collection of document processing suite including Excel, Word, PowerPoint, and PDF capabilities |

### Seguridad

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`claude-security`](plugins/security/claude-security) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `0.11.0` | 1 | Deep vulnerability scanning of your own code, run entirely inside your Claude Code session at a chosen effort… |
| [`security-guidance`](plugins/security/security-guidance) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `2.0.8` | — | Security review for Claude-generated code. Pattern-based warnings on edits, LLM-powered diff review on Stop… |
| [`semgrep`](plugins/security/semgrep) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | `2.2.0` | 1 | Semgrep Guardian: Scans agent-generated code for security vulnerabilities. |

### Video y media

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`core-skills`](plugins/video-media/hyperframes) | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | `0.8.34` | 20 | HyperFrames by HeyGen. Write HTML, render video. Compositions, GSAP and runtime adapter animations, captions… |

### IA y aprendizaje

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`andrej-karpathy-skills`](plugins/ai-learning/andrej-karpathy-skills) | [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | `1.0.0` | 1 | Behavioral guidelines to reduce common LLM coding mistakes, derived from Andrej Karpathy's observations on LL… |

### Ejemplos y plantillas

| Plugin | Origen | Version | Skills | Descripcion |
|---|---|---|---|---|
| [`example-skills`](plugins/examples/example-skills) | [anthropics/skills](https://github.com/anthropics/skills) | `34040c9c5685` | 20 | Collection of example skills demonstrating various capabilities including skill creation, MCP building, visua… |

## Reinstalar en una maquina nueva

```powershell
git clone https://github.com/webcreatorms-source/skills.git
cd skills

# marketplaces + plugins desde sus origenes
pwsh ./scripts/install-all.ps1

# skills sueltas a ~/.claude/skills
pwsh ./scripts/install-all.ps1 -Skills
```

## Resincronizar este repo

Tras instalar o actualizar skills en Claude Code:

```powershell
node ./scripts/sync.mjs
```

Vuelve a copiar todo desde `~/.claude`, regenera `catalog.json` y este README.

## Notas de procedencia

- ~/.claude/skills (skills standalone)
- ~/.claude/plugins/cache + installed_plugins.json (plugins de marketplace)
- ~/.claude/plugins/known_marketplaces.json (origenes en GitHub)
- github.com/heygen-com/hyperframes (marketplace local en plugins/video-media)
- Las copias en `~/.agents`, `~/.hermes` y `~/.gemini` son espejos del mismo contenido (la de `.gemini` es la variante de `impeccable` para Gemini, misma version) — no se duplican aqui.
- De `anthropic-agent-skills` hay varias versiones en cache; solo se guarda la instalada.
- De `heygen-com/hyperframes` solo se guarda `skills/` + `.claude-plugin/` (19 MB); el monorepo completo pesa 1.4 GB.
