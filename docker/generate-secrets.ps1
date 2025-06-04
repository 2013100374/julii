# Function to generate a random password
function Generate-Password {
    $randomBytes = New-Object byte[] 16
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($randomBytes)
    return [Convert]::ToBase64String($randomBytes)
}

# Function to generate a random hex string
function Generate-HexString {
    param ([int]$length = 32)
    $randomBytes = New-Object byte[] ($length / 2)
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($randomBytes)
    return [BitConverter]::ToString($randomBytes).Replace("-", "").ToLower()
}

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    if (Test-Path .env.example) {
        Copy-Item .env.example .env
    } else {
        New-Item -Path .env -ItemType File | Out-Null
    }
}

# Read current .env file
$envContent = Get-Content .env -Raw -ErrorAction SilentlyContinue
if (-not $envContent) { $envContent = "" }

# Generate Laravel APP_KEY if it doesn't exist
if (-not ($envContent -match "^APP_KEY=") -or ($envContent -match "^APP_KEY=$")) {
    $randomBytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($randomBytes)
    $appKey = "base64:" + [Convert]::ToBase64String($randomBytes)
    
    if ($envContent -match "^APP_KEY=") {
        $envContent = $envContent -replace "^APP_KEY=.*", "APP_KEY=$appKey"
    } else {
        $envContent += "`nAPP_KEY=$appKey"
    }
    
    Write-Host "Generated new Laravel APP_KEY"
}

# Generate NextAuth Secret if it doesn't exist
if (-not ($envContent -match "^NEXTAUTH_SECRET=") -or ($envContent -match "^NEXTAUTH_SECRET=$")) {
    $nextAuthSecret = Generate-HexString -length 64
    
    if ($envContent -match "^NEXTAUTH_SECRET=") {
        $envContent = $envContent -replace "^NEXTAUTH_SECRET=.*", "NEXTAUTH_SECRET=$nextAuthSecret"
    } else {
        $envContent += "`nNEXTAUTH_SECRET=$nextAuthSecret"
    }
    
    Write-Host "Generated new NEXTAUTH_SECRET"
}

# Generate database passwords if they don't exist
if (-not ($envContent -match "^DB_PASSWORD=") -or ($envContent -match "^DB_PASSWORD=$")) {
    $dbPassword = Generate-Password
    
    if ($envContent -match "^DB_PASSWORD=") {
        $envContent = $envContent -replace "^DB_PASSWORD=.*", "DB_PASSWORD=$dbPassword"
    } else {
        $envContent += "`nDB_PASSWORD=$dbPassword"
    }
    
    Write-Host "Generated new DB_PASSWORD"
}

if (-not ($envContent -match "^MYSQL_ROOT_PASSWORD=") -or ($envContent -match "^MYSQL_ROOT_PASSWORD=$")) {
    $mysqlRootPassword = Generate-Password
    
    if ($envContent -match "^MYSQL_ROOT_PASSWORD=") {
        $envContent = $envContent -replace "^MYSQL_ROOT_PASSWORD=.*", "MYSQL_ROOT_PASSWORD=$mysqlRootPassword"
    } else {
        $envContent += "`nMYSQL_ROOT_PASSWORD=$mysqlRootPassword"
    }
    
    Write-Host "Generated new MYSQL_ROOT_PASSWORD"
}

# Save updated .env file
$envContent | Set-Content .env

Write-Host "Secrets generated successfully. Your .env file has been updated."
Write-Host "WARNING: DO NOT commit the .env file to version control."

