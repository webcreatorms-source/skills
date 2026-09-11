<#
.SYNOPSIS
  Reinstala en esta maquina todo lo inventariado en catalog.json.

.DESCRIPTION
  Sin parametros: registra cada marketplace de GitHub y reinstala sus plugins
  con la CLI de Claude Code. Con -Skills: copia las skills sueltas de este repo
  a ~/.claude/skills. Con -All: las dos cosas.

.EXAMPLE
  pwsh ./scripts/install-all.ps1
  pwsh ./scripts/install-all.ps1 -Skills
  pwsh ./scripts/install-all.ps1 -All -WhatIf
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [switch]$Skills,
    [switch]$All,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$catalogPath = Join-Path $repo 'catalog.json'

if (-not (Test-Path $catalogPath)) {
    throw "No encuentro catalog.json en $repo. Ejecuta antes: node ./scripts/sync.mjs"
}
$catalog = Get-Content $catalogPath -Raw | ConvertFrom-Json

$doPlugins = $All -or (-not $Skills)
$doSkills = $All -or $Skills

# ------------------------------------------------------------- marketplaces + plugins
if ($doPlugins) {
    if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
        throw 'No encuentro el ejecutable "claude" en el PATH. Instala Claude Code primero.'
    }

    # 1. marketplaces remotos (uno por repo de GitHub, sin repetir)
    $remote = $catalog.plugins |
        Where-Object { $_.marketplaceRepo -and -not $_.localMarketplace } |
        Select-Object -ExpandProperty marketplaceRepo -Unique

    Write-Host "`n== Marketplaces ($($remote.Count)) ==" -ForegroundColor Cyan
    foreach ($r in $remote) {
        if ($PSCmdlet.ShouldProcess($r, 'claude plugin marketplace add')) {
            Write-Host "  + $r"
            & claude plugin marketplace add $r 2>&1 | Select-Object -Last 1
        }
    }

    # 2. marketplaces locales que viven dentro de este repo (p.ej. hyperframes)
    $local = $catalog.plugins | Where-Object { $_.localMarketplace }
    if ($local) {
        Write-Host "`n== Marketplaces locales ($($local.Count)) ==" -ForegroundColor Cyan
        foreach ($p in $local) {
            $abs = Join-Path $repo $p.path
            if (-not (Test-Path $abs)) { Write-Warning "  falta $($p.path)"; continue }
            if ($PSCmdlet.ShouldProcess($abs, 'claude plugin marketplace add')) {
                Write-Host "  + $($p.marketplace) <- $($p.path)"
                & claude plugin marketplace add $abs 2>&1 | Select-Object -Last 1
            }
        }
    }

    # 3. plugins
    Write-Host "`n== Plugins ($($catalog.plugins.Count)) ==" -ForegroundColor Cyan
    foreach ($p in $catalog.plugins) {
        $ref = "$($p.plugin)@$($p.marketplace)"
        if ($PSCmdlet.ShouldProcess($ref, 'claude plugin install')) {
            Write-Host "  + $ref"
            & claude plugin install $ref 2>&1 | Select-Object -Last 1
        }
    }
}

# ------------------------------------------------------------------ skills sueltas
if ($doSkills) {
    $dest = Join-Path $HOME '.claude/skills'
    New-Item -ItemType Directory -Force -Path $dest | Out-Null

    Write-Host "`n== Skills standalone ($($catalog.skills.Count)) -> $dest ==" -ForegroundColor Cyan
    foreach ($s in $catalog.skills) {
        $src = Join-Path $repo $s.path
        $tgt = Join-Path $dest $s.name
        if (-not (Test-Path $src)) { Write-Warning "  falta $($s.path)"; continue }

        if ((Test-Path $tgt) -and -not $Force) {
            Write-Host "  = $($s.name) (ya existe, usa -Force para sobreescribir)" -ForegroundColor DarkGray
            continue
        }
        if ($PSCmdlet.ShouldProcess($tgt, 'copiar skill')) {
            if (Test-Path $tgt) { Remove-Item $tgt -Recurse -Force }
            Copy-Item $src $tgt -Recurse
            Write-Host "  + $($s.name)"
        }
    }
}

Write-Host "`nListo." -ForegroundColor Green
