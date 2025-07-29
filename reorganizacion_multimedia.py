import os, shutil, pandas as pd, re

# === 1. Cargar el mapeo generado ===
map_path = "mapeo_multimedia.csv"  # exporta primero el DataFrame a CSV
df = pd.read_csv(map_path)

# === 2. Paths ===
project_root = "sebastianvernis.com"  # ajusta a tu carpeta local
media_root = os.path.join(project_root, "Media")
assets_root = os.path.join(project_root, "assets")

# === 3. Crear carpetas destino ===
for _, row in df.iterrows():
    new_dir = os.path.dirname(os.path.join(project_root, row["Nueva Ruta"].lstrip("/")))
    os.makedirs(new_dir, exist_ok=True)

# === 4. Mover y renombrar archivos ===
log = []
for _, row in df.iterrows():
    old_path = os.path.join(project_root, row["Ruta Actual"])
    new_path = os.path.join(project_root, row["Nueva Ruta"].lstrip("/"))
    if os.path.exists(old_path):
        shutil.move(old_path, new_path)
        log.append(f"MOVIDO: {old_path} → {new_path}")
    else:
        log.append(f"NO ENCONTRADO: {old_path}")

with open("reubicacion.log", "w") as f:
    f.write("\n".join(log))

# === 5. Actualizar rutas en archivos HTML, CSS, JS ===
files_to_scan = []
for root, _, files in os.walk(project_root):
    for f in files:
        if f.endswith((".html", ".css", ".js")):
            files_to_scan.append(os.path.join(root, f))

replace_map = dict(zip(df["Ruta Actual"], df["Nueva Ruta"]))

for file_path in files_to_scan:
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    new_content = content
    for old, new in replace_map.items():
        new_content = re.sub(re.escape(old), new, new_content)
    if new_content != content:
        backup = file_path + ".bak"
        shutil.copy(file_path, backup)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)