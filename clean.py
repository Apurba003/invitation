import re

with open("index.html", "r", encoding="utf-8") as file:
    html = file.read()
html = re.sub(r"(?s)<!-- ░░░ FLOATING FEATURE BAR ░░░ -->.*?<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->", "<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->", html)
html = re.sub(r"(?s)<!-- ░░░ FEATURE PANEL ░░░ -->.*?<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->", "<!-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ -->", html)
with open("index.html", "w", encoding="utf-8") as file:
    file.write(html)

with open("style.css", "r", encoding="utf-8") as file:
    css = file.read()
css = re.sub(r"(?s)/\* ── FEATURE BAR ─────────────────────────────── \*/.*?/\* ── RESPONSIVE ──────────────────────────────── \*/", "/* ── RESPONSIVE ──────────────────────────────── */", css)
css = re.sub(r"(?s)[ \t]*\.feat-panel\{[^}]*\}\r?\n?", "", css)
css = re.sub(r"(?s)[ \t]*\.feat-panel\.open\{[^}]*\}\r?\n?", "", css)
css = re.sub(r"(?s)[ \t]*\.feat-bar\{[^}]*\}\r?\n?", "", css)
css = re.sub(r"(?s)[ \t]*\.fb-btn\{[^}]*\}\r?\n?", "", css)
with open("style.css", "w", encoding="utf-8") as file:
    file.write(css)

with open("script.js", "r", encoding="utf-8") as file:
    js = file.read()
js = re.sub(r"(?s)// ── FEATURE PANEL ─────────────────────────────.*?// ── MUSIC ─────────────────────────────────────", "// ── MUSIC ─────────────────────────────────────", js)
js = re.sub(r"(?s)// ── RSVP ──────────────────────────────────────.*?// ── BURST ─────────────────────────────────────", "// ── BURST ─────────────────────────────────────", js)
with open("script.js", "w", encoding="utf-8") as file:
    file.write(js)
