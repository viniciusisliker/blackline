# Clareia levemente imagens do site (opcional).
# O tema claro é aplicado via CSS — evite valores altos que estouram o PNG para branco.
param(
    [switch]$Apply
)

if (-not $Apply) {
    Write-Host "Pulado: use -Apply para clarear. Recomendado manter originais + filtros CSS."
    exit 0
}

Add-Type -AssemblyName System.Drawing

function Set-LighterImage {
    param(
        [string]$Path,
        [float]$Brightness = 1.06,
        [float]$Saturation = 0.94,
        [float]$Lift = 6
    )

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
    $cm.Matrix40 = $Lift
    $cm.Matrix41 = $Lift
    $cm.Matrix42 = $Lift

    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm)

    $rect = [System.Drawing.Rectangle]::FromLTRB(0, 0, $img.Width, $img.Height)
    $g.DrawImage($img, $rect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $bmp.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()

    $newSize = (Get-Item $temp).Length
    if ($newSize -lt 10KB) {
        Remove-Item $temp -Force
        Write-Warning "Ignorado (arquivo corrompido): $resolved"
        return
    }

    Move-Item -Force $temp $resolved
    Write-Host "OK: $resolved ($([math]::Round($newSize/1KB,1)) KB)"
}

$root = Join-Path $PSScriptRoot '..\public\site\img'
$skip = @('logo-blackline.png', 'favicon.png', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png')

Get-ChildItem -Path $root -Filter '*.png' | ForEach-Object {
    if ($skip -contains $_.Name) { return }
    Set-LighterImage $_.FullName
}
