# PowerShell Deployment Script for Laravel Website on IIS (Windows Server)
param (
    [string]$TargetDir = ""
)

$sourceDir = Get-Item .
$packageDir = Join-Path $sourceDir.Parent.FullName "ITCTV_deploy"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "         LARAVEL IIS DEPLOYMENT SCRIPT       " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Ask for Target Directory if not provided
if ([string]::IsNullOrEmpty($TargetDir)) {
    $defaultPath = "C:\inetpub\wwwroot\itc-website"
    $inputPath = Read-Host "Enter target IIS site directory [Default: $defaultPath]"
    if ([string]::IsNullOrEmpty($inputPath)) {
        $TargetDir = $defaultPath
    } else {
        $TargetDir = $inputPath
    }
}

# Resolve target absolute path
$TargetDir = [System.IO.Path]::GetFullPath($TargetDir)
Write-Host "Deploying to: $TargetDir" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan

# 2. Build deployment package using create-deploy-package.ps1
$buildScript = Join-Path $sourceDir.FullName "create-deploy-package.ps1"
if (Test-Path $buildScript) {
    Write-Host "Step 1: Running create-deploy-package.ps1 to build clean assets..." -ForegroundColor Cyan
    $global:LASTEXITCODE = 0
    & $buildScript
    # Check if package folder exists and is not empty, ignoring robocopy non-zero success codes (1-7)
    if (-not (Test-Path $packageDir) -or (Get-ChildItem $packageDir).Count -eq 0) {
        Write-Error "Deployment package creation failed. Folder is missing or empty. Aborting deployment."
        exit 1
    }
} else {
    Write-Error "create-deploy-package.ps1 script not found! Aborting deployment."
    exit 1
}

# 4. Sync files to Target Directory
Write-Host "`nStep 2: Copying deployment package to target directory..." -ForegroundColor Cyan
if (-not (Test-Path $TargetDir)) {
    Write-Host "Target directory does not exist. Creating it now..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Write-Host "Synchronizing files..." -ForegroundColor Gray
# Use Robocopy for copying the deployment directory (excluding local settings if needed)
# robocopy exit codes 0-7 indicate success
robocopy $packageDir $TargetDir /E /R:1 /W:1 | Out-Null
$rcCode = $LASTEXITCODE

if ($rcCode -ge 8) {
    Write-Error "Robocopy failed to copy files. Exit code: $rcCode"
    exit 1
}
Write-Host "File synchronization completed successfully!" -ForegroundColor Green

# 5. Set up IIS Directory Permissions
Write-Host "`nStep 3: Configuring folder permissions for IIS (IIS_IUSRS)..." -ForegroundColor Cyan
$storagePath = Join-Path $TargetDir "storage"
$cachePath = Join-Path $TargetDir "bootstrap\cache"

$hasAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($hasAdmin) {
    if (Test-Path $storagePath) {
        Write-Host "Setting modify permissions on storage folder..." -ForegroundColor Gray
        icacls $storagePath /grant "IIS_IUSRS:(OI)(CI)M" /T /Q | Out-Null
    }
    if (Test-Path $cachePath) {
        Write-Host "Setting modify permissions on bootstrap/cache folder..." -ForegroundColor Gray
        icacls $cachePath /grant "IIS_IUSRS:(OI)(CI)M" /T /Q | Out-Null
    }
    Write-Host "Permissions configured successfully!" -ForegroundColor Green
} else {
    Write-Warning "Not running as Administrator. Skipping IIS_IUSRS permission configuration."
    Write-Warning "Ensure storage/ and bootstrap/cache/ have write access for IIS process."
}

# 6. Check for local .env in the target folder
$targetEnv = Join-Path $TargetDir ".env"
if (-not (Test-Path $targetEnv)) {
    $exampleEnv = Join-Path $TargetDir ".env.example"
    if (Test-Path $exampleEnv) {
        Write-Host "`nStep 4: Creating default .env from .env.example..." -ForegroundColor Yellow
        Copy-Item -Path $exampleEnv -Destination $targetEnv -Force
        Write-Warning "Created a new .env file in target folder. Please configure your DB credentials inside it."
    }
}

# 7. Post-deployment optimizations in Target Directory
Write-Host "`nStep 5: Executing Laravel post-deploy optimization commands..." -ForegroundColor Cyan
if (Get-Command php -ErrorAction SilentlyContinue) {
    $artisanFile = Join-Path $TargetDir "artisan"
    if (Test-Path $artisanFile) {
        Push-Location $TargetDir
        try {
            Write-Host "Entering maintenance mode..." -ForegroundColor Gray
            php artisan down | Out-Null

            Write-Host "Running database migrations..." -ForegroundColor Gray
            php artisan migrate --force

            Write-Host "Caching configurations..." -ForegroundColor Gray
            php artisan config:cache | Out-Null
            php artisan route:cache | Out-Null
            php artisan view:cache | Out-Null

            Write-Host "Leaving maintenance mode..." -ForegroundColor Gray
            php artisan up | Out-Null

            Write-Host "Laravel post-deployment commands executed successfully!" -ForegroundColor Green
        } catch {
            Write-Warning "Artisan commands execution encountered errors: $_. Site put back online."
            php artisan up -ErrorAction SilentlyContinue | Out-Null
        }
        Pop-Location
    } else {
        Write-Warning "artisan file not found in target directory. Skipping optimizations."
    }
} else {
    Write-Warning "php is not installed or not in PATH. Skipping Laravel optimizations."
    Write-Warning "Please configure config/route caches manually on server if needed."
}

Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "         DEPLOYMENT SUCCESSFUL!              " -ForegroundColor Green
Write-Host " Target Site: $TargetDir" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
