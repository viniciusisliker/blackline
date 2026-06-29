# Clareia imagens do site para visual premium (branco/prata)
Add-Type -AssemblyName System.Drawing

function Set-LighterImage {
    param([string]$Path, [float]$Brightness = 1.18, [float]$Saturation = 0.88)

    if (-not (Test-Path $Path)) {
        Write-Warning "Arquivo não encontrado: $Path"
        return
    }

    $resolved = (Resolve-Path $Path).Path
    $temp = "$resolved.tmp.png"

    $img = [System.Drawing.Image]::FromFile($resolved)
    $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    $cm = New-Object System.Drawing.Imaging.ColorMatrix
    $gray = 0.299 * $Brightness + 0.587 * $Brightness + 0.114 * $Brightness
    $cm.Matrix00 = $gray * $Saturation
    $cm.Matrix11 = $gray * $Saturation
    $cm.Matrix22 = $gray * $Saturation
    $cm.Matrix33 = 1
    $cm.Matrix44 = 1
    $cm.Matrix40 = 18
    $cm.Matrix41 = 18
    $cm.Matrix42 = 18

    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm)

    $rect = [System.Drawing.Rectangle]::FromLTRB(0, 0, $img.Width, $img.Height)
    $g.DrawImage($img, $rect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $bmp.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()

    Move-Item -Force $temp $resolved
    Write-Host "OK: $resolved"
}

$root = Join-Path $PSScriptRoot '..\public\site\img'
Set-LighterImage (Join-Path $root 'hero.png')
Set-LighterImage (Join-Path $root 'produtos-banner.png')
