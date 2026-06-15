# Pull Required Ollama Models for Production (AWS g4dn.xlarge)
# This script pulls production models optimized for 16GB GPU

Write-Host "🔍 Pulling Production Ollama Models..." -ForegroundColor Cyan
Write-Host ""

# Define production models (optimized for g4dn.xlarge - 16GB GPU)
$models = @(
    @{Name="qwen2.5:14b-instruct-q4_K_M"; Description="General purpose model (~8GB)"; Status="pending"},
    @{Name="qwen2.5-coder:7b-instruct-q4_K_M"; Description="Code generation model (~4.5GB)"; Status="pending"}
)

$successCount = 0
$failCount = 0

foreach ($model in $models) {
    Write-Host "📥 Pulling $($model.Name)..." -ForegroundColor Yellow
    Write-Host "   Description: $($model.Description)" -ForegroundColor Gray
    
    try {
        $output = ollama pull $model.Name 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ Successfully pulled $($model.Name)" -ForegroundColor Green
            $model.Status = "success"
            $successCount++
        } else {
            Write-Host "   ❌ Failed to pull $($model.Name)" -ForegroundColor Red
            Write-Host "   Error: $($output -join ' ')" -ForegroundColor Red
            $model.Status = "failed"
            $failCount++
        }
    } catch {
        Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        $model.Status = "failed"
        $failCount++
    }
    
    Write-Host ""
}

# Summary
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   ✅ Success: $successCount" -ForegroundColor Green
Write-Host "   ❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

# Show what was pulled
Write-Host "📋 Models Status:" -ForegroundColor Cyan
foreach ($model in $models) {
    $statusIcon = if ($model.Status -eq "success") { "✅" } else { "❌" }
    Write-Host "   $statusIcon $($model.Name) - $($model.Description)" -ForegroundColor $(if ($model.Status -eq "success") { "Green" } else { "Red" })
}

Write-Host ""

# Note about production models
Write-Host "💡 Production Models (AWS g4dn.xlarge - 16GB GPU):" -ForegroundColor Yellow
Write-Host "   - qwen2.5:14b-instruct-q4_K_M (~8GB) - General purpose AI tasks" -ForegroundColor White
Write-Host "   - qwen2.5-coder:7b-instruct-q4_K_M (~4.5GB) - Code generation tasks" -ForegroundColor White
Write-Host "   - Total: ~12.5GB (fits in 16GB GPU)" -ForegroundColor White

Write-Host ""
Write-Host "✅ Model pulling complete!" -ForegroundColor Green
