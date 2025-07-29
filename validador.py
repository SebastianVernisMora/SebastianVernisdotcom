import os, re

project_root = "sebastianvernis.com"  # ajusta al nombre de tu carpeta
assets_root = os.path.join(project_root, "assets")

# 1. Recopilar todos los archivos multimedia existentes después de reorganización
existing_assets = set()
for root, _, files in os.walk(assets_root):
    for f in files:
        existing_assets.add(os.path.relpath(os.path.join(root, f), project_root))

# 2. Buscar referencias en HTML, CSS, JS
files_to_scan = []
for root, _, files in os.walk(project_root):
    for f in files:
        if f.endswith((".html", ".css", ".js")):
            files_to_scan.append(os.path.join(root, f))

pattern = re.compile(r'([a-zA-Z0-9_\-\/]+(?:\.(?:png|jpg|jpeg|webp|gif|mp4|svg)))', re.IGNORECASE)

referenced_assets = set()
for file_path in files_to_scan:
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        matches = pattern.findall(content)
        for m in matches:
            # Normalizar rutas relativas
            referenced_assets.add(m.lstrip("./"))

# 3. Comparar referencias con archivos reales
missing_assets = [asset for asset in referenced_assets if asset not in existing_assets]

# 4. Guardar reporte
with open("faltantes_multimedia.log", "w") as log:
    log.write("=== VALIDACIÓN DE MULTIMEDIA ===\n")
    log.write(f"Total Referencias: {len(referenced_assets)}\n")
    log.write(f"Total Encontrados: {len(referenced_assets) - len(missing_assets)}\n")
    log.write(f"Total Faltantes: {len(missing_assets)}\n\n")
    
    if missing_assets:
        log.write("❌ Archivos Faltantes:\n")
        for asset in missing_assets:
            log.write(f"- {asset}\n")
    else:
        log.write("✅ No hay archivos faltantes. Todo OK.\n")

print("✅ Validación completada. Revisa 'faltantes_multimedia.log'")