# Script to create a lightweight deployment folder for Laravel on IIS (Folder only, no ZIP)

$sourceDir = Get-Item .
$destDir = Join-Path $sourceDir.Parent.FullName "ITCTV_deploy"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Creating clean deployment folder..." -ForegroundColor Cyan
Write-Host "Source: $($sourceDir.FullName)" -ForegroundColor Yellow
Write-Host "Destination Folder: $destDir" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Compile frontend assets using npm if available
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "Running 'npm run build' in root to compile Laravel assets..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Root npm run build failed. Proceeding..."
    }
    
    # Check and compile the React app in resources/react-app
    $reactAppDir = Join-Path $sourceDir.FullName "resources\react-app"
    if (Test-Path $reactAppDir) {
        Write-Host "Found React App at resources/react-app. Compiling React frontend assets..." -ForegroundColor Cyan
        Push-Location $reactAppDir
        npm run build
        Pop-Location
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "React App compilation failed. Proceeding..."
        }
    }
} else {
    Write-Warning "npm is not installed or not in PATH. Skipping build steps. Please make sure assets are already compiled."
}

# 2. Create or clear destination directory
if (Test-Path $destDir) {
    Write-Host "Destination folder already exists. Cleaning before sync..." -ForegroundColor Gray
    Remove-Item -Path $destDir -Recurse -Force -ErrorAction SilentlyContinue | Out-Null
}
New-Item -ItemType Directory -Path $destDir -Force | Out-Null
Write-Host "Created fresh destination folder." -ForegroundColor Green

# 3. Define folders to copy entirely (includes public/ which now contains the fresh build/ and react-assets/ folders)
$foldersToCopy = @("app", "bootstrap", "config", "database", "public", "resources", "routes", "vendor")

foreach ($folder in $foldersToCopy) {
    $srcFolder = Join-Path $sourceDir.FullName $folder
    $destFolder = Join-Path $destDir $folder
    
    if (Test-Path $srcFolder) {
        Write-Host "Copying folder: $folder..." -ForegroundColor Gray
        # Use Robocopy for fast and reliable copying
        robocopy $srcFolder $destFolder /E /XD .git /R:1 /W:1 | Out-Null
    }
}

# 4. Handle storage folder structure (needs empty subfolders for cache, sessions, views, logs)
Write-Host "Setting up storage folder structure..." -ForegroundColor Gray
$storageDirs = @(
    "storage",
    "storage\app",
    "storage\app\public",
    "storage\framework",
    "storage\framework\cache",
    "storage\framework\cache\data",
    "storage\framework\sessions",
    "storage\framework\views",
    "storage\logs"
)

foreach ($dir in $storageDirs) {
    $fullPath = Join-Path $destDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    }
}

# 5. Copy individual files from root
$filesToCopy = @("artisan", "composer.json", "package.json", ".env.example")
foreach ($file in $filesToCopy) {
    $srcFile = Join-Path $sourceDir.FullName $file
    if (Test-Path $srcFile) {
        Write-Host "Copying file: $file..." -ForegroundColor Gray
        Copy-Item -Path $srcFile -Destination $destDir -Force
    }
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Deployment folder created successfully!" -ForegroundColor Green
Write-Host "Folder path: $destDir" -ForegroundColor Green
Write-Host "Excluded items: .git, node_modules, tests, local .env, logs, and framework caches." -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan
