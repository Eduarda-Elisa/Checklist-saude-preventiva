Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Checklist de Saude Preventiva" -ForegroundColor Cyan
Write-Host "  Iniciando Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$frontendPath = Join-Path $PSScriptRoot "frontend"

if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "Instalando dependencias do frontend..." -ForegroundColor Yellow
    Write-Host "Isso pode levar alguns minutos..." -ForegroundColor Yellow
    Set-Location $frontendPath
    npm install
    Write-Host "Dependencias instaladas!" -ForegroundColor Green
    Write-Host ""
}

Set-Location $frontendPath
Write-Host "Iniciando aplicacao frontend..." -ForegroundColor Green
Write-Host "A aplicacao sera aberta automaticamente no navegador" -ForegroundColor Green
npm start
