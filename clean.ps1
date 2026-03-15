$htmlPath = "index.html"
$htmlContent = Get-Content $htmlPath -Raw -Encoding UTF8
$htmlContent = $htmlContent -replace '(?s)<!-- ░░░ FLOATING FEATURE BAR ░░░ -->.*?<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->', '<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->'
Set-Content -Path $htmlPath -Value $htmlContent -Encoding UTF8

$cssPath = "style.css"
$cssContent = Get-Content $cssPath -Raw -Encoding UTF8
$cssContent = $cssContent -replace '(?s)/\* ── FEATURE BAR ─────────────────────────────── \*/.*?/\* ── RESPONSIVE ──────────────────────────────── \*/', '/* ── RESPONSIVE ──────────────────────────────── */'
$cssContent = $cssContent -replace '(?s)[ \t]*\.feat-panel\{[^}]*\}\r?\n?', ''
$cssContent = $cssContent -replace '(?s)[ \t]*\.feat-panel\.open\{[^}]*\}\r?\n?', ''
$cssContent = $cssContent -replace '(?s)[ \t]*\.feat-bar\{[^}]*\}\r?\n?', ''
$cssContent = $cssContent -replace '(?s)[ \t]*\.fb-btn\{[^}]*\}\r?\n?', ''
Set-Content -Path $cssPath -Value $cssContent -Encoding UTF8

$jsPath = "script.js"
$jsContent = Get-Content $jsPath -Raw -Encoding UTF8
$jsContent = $jsContent -replace '(?s)// ── FEATURE PANEL ─────────────────────────────.*?// ── MUSIC ─────────────────────────────────────', '// ── MUSIC ─────────────────────────────────────'
$jsContent = $jsContent -replace '(?s)// ── RSVP ──────────────────────────────────────.*?// ── BURST ─────────────────────────────────────', '// ── BURST ─────────────────────────────────────'
Set-Content -Path $jsPath -Value $jsContent -Encoding UTF8
