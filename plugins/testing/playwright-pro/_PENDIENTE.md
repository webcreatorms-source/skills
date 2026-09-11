# playwright-pro — descargado, NO instalado

Este plugin esta en el repo pero **no figura en `catalog.json`** porque no llego a
instalarse. Queda aqui porque esta carpeta es el marketplace local desde el que
se instala: si la borras, no hay de donde instalarlo.

## Por que no esta instalado

Dos motivos, en este orden:

1. El catalogo de la comunidad apunta a este plugin por **SSH**
   (`git-subdir` sobre `alirezarezvani/claude-skills`), y
   `claude plugin install playwright-pro@claude-community` falla con
   `Host key verification failed`. Por eso se bajo por HTTPS con un sparse
   checkout y se le anadio el `marketplace.json` que hay en `.claude-plugin/`.
2. Registrar el marketplace quedo bloqueado por el clasificador de Claude Code
   como *Untrusted Code Integration*: el plugin trae **hooks** que se ejecutan
   solos al escribir ficheros de test. Esa decision es del usuario, no del
   agente.

## Que hace

Toolkit de Playwright de nivel produccion (v2.9.0, MIT, de Alireza Rezvani):

- 55 plantillas de test en 11 categorias (auth, CRUD, checkout, formularios,
  dashboard, API, accesibilidad), con variantes TypeScript y JavaScript
- 3 agentes: `test-architect`, `test-debugger`, `migration-planner`
- Hooks que validan cada fichero de test que se escribe y avisan de
  `waitForTimeout`, URLs hardcodeadas y asserts que no son web-first
- Integraciones opcionales con TestRail y BrowserStack (desactivadas por
  defecto)

El nombre interno del plugin es `pw`, no `playwright-pro`.

## Como activarlo

Desde Claude Code, con el prefijo `!` para ejecutarlo tu:

```
!claude plugin marketplace add "C:\Users\fazeb\Desktop\Proyectos\skills\plugins\testing\playwright-pro"
!claude plugin install pw@playwright-pro
```

Despues, `node ./scripts/sync.mjs` ya lo recoge en `catalog.json` y en el README.
Para que ese sync no lo duplique, `pw` esta declarado en `PINNED` y en
`LOCAL_ORIGINS` dentro de `scripts/sync.mjs`.

## Como descartarlo

Borra esta carpeta entera. No hay nada mas que deshacer: nunca llego a
registrarse ningun marketplace ni a instalarse nada.
