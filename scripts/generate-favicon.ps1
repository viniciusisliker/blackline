Add-Type -AssemblyName System.Drawing

$src = Join-Path $PSScriptRoot '..\public\site\img\logo-blackline.png'
$logo = [System.Drawing.Image]::FromFile($src)

function Make-Favicon {
  param([int]$Size, [string]$Out)
  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'HighQuality'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.Clear([System.Drawing.Color]::White)
  $pad = [math]::Round($Size * 0.08)
  $maxW = $Size - ($pad * 2)
  $maxH = $Size - ($pad * 2)
  $ratio = [math]::Min($maxW / $logo.Width, $maxH / $logo.Height)
  $w = [int]($logo.Width * $ratio)
  $h = [int]($logo.Height * $ratio)
  $x = [int](($Size - $w) / 2)
  $y = [int](($Size - $h) / 2)
  $g.DrawImage($logo, $x, $y, $w, $h)
  $bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

$dirs = @(
  (Join-Path $PSScriptRoot '..\public\site\img'),
  (Join-Path $PSScriptRoot '..\public\img')
)

foreach ($dir in $dirs) {
  Make-Favicon -Size 16 -Out (Join-Path $dir 'favicon-16.png')
  Make-Favicon -Size 32 -Out (Join-Path $dir 'favicon-32.png')
  Make-Favicon -Size 180 -Out (Join-Path $dir 'apple-touch-icon.png')
  Copy-Item (Join-Path $dir 'favicon-32.png') (Join-Path $dir 'favicon.png') -Force
}

$logo.Dispose()
node (Join-Path $PSScriptRoot 'sync-favicon-svg.mjs')
Write-Host 'Favicons generated.'
