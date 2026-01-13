Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Checklist de Saude Preventiva" -ForegroundColor Cyan
Write-Host "  Iniciando Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"

if (-not (Test-Path (Join-Path $backendPath "node_modules"))) {
    Write-Host "Instalando dependencias do backend..." -ForegroundColor Yellow
    Set-Location $backendPath
    npm install
    Write-Host "Dependencias instaladas!" -ForegroundColor Green
    Write-Host ""
}

Set-Location $backendPath
Write-Host "Iniciando servidor backend na porta 3000..." -ForegroundColor Green
npm start
