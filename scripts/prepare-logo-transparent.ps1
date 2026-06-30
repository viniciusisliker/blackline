Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path $PSScriptRoot '..\public\site\img'
$src = Join-Path $imgDir 'logo-blackline.png'
$out = Join-Path $imgDir 'logo-blackline-transparent.png'

if (-not (Test-Path $src)) {
  Write-Error "Arquivo não encontrado: $src"
  exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path $src))
$newBmp = New-Object System.Drawing.Bitmap $bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $bmp.Width; $x++) {
  for ($y = 0; $y -lt $bmp.Height; $y++) {
    $c = $bmp.GetPixel($x, $y)
    $isWhite = ($c.R -ge 235 -and $c.G -ge 235 -and $c.B -ge 235)
    if ($isWhite) {
      $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    } else {
      $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
    }
  }
}

$newBmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$newBmp.Dispose()

Write-Host "Logo transparente gerado: $out"
