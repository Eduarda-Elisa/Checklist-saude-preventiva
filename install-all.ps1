Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Checklist de Saude Preventiva" -ForegroundColor Cyan
Write-Host "  Inicializacao Completa" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-Host "Verificando instalacao..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path (Join-Path $backendPath "node_modules"))) {
    Write-Host "Instalando dependencias do backend..." -ForegroundColor Yellow
    Set-Location $backendPath
    npm install
    Write-Host "Backend: Dependencias instaladas!" -ForegroundColor Green
    Write-Host ""
}

if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "Instalando dependencias do frontend..." -ForegroundColor Yellow
    Write-Host "Isso pode levar alguns minutos..." -ForegroundColor Yellow
    Set-Location $frontendPath
    npm install
    Write-Host "Frontend: Dependencias instaladas!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Instalacao Concluida!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar o sistema:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Abra um terminal e execute:" -ForegroundColor White
Write-Host "   .\start-backend.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Abra OUTRO terminal e execute:" -ForegroundColor White
Write-Host "   .\start-frontend.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "O sistema estara disponivel em:" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:3000" -ForegroundColor White
Write-Host "  Frontend: http://localhost:4200" -ForegroundColor White
Write-Host ""
