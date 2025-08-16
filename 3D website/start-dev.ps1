Write-Host "Starting Dileep Portfolio Development Environment..." -ForegroundColor Green
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm run install-all

Write-Host ""
Write-Host "Starting development servers..." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
Write-Host ""

npm run dev

Read-Host "Press Enter to exit"
