import os
from PIL import Image
from rembg import remove

# Configuraciones
input_folder = "./"        # Carpeta de imágenes originales
output_folder = "output"   # Carpeta para imágenes procesadas
target_size = (600, 800)   # Tamaño final: ancho x alto

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        continue

    input_path = os.path.join(input_folder, filename)
    output_path = os.path.join(output_folder, filename)

    with Image.open(input_path) as img:
        img = img.convert("RGBA")

        # Remover fondo
        img_no_bg = remove(img)

        # Fondo blanco para componer
        white_bg = Image.new("RGBA", img_no_bg.size, (255, 255, 255, 255))
        img_with_white = Image.alpha_composite(white_bg, img_no_bg)
        final_img = img_with_white.convert("RGB")

        # Redimensionar manteniendo altura fija
        target_height = target_size[1]  # 800 px altura fija
        w, h = final_img.size
        new_height = target_height
        new_width = int((w / h) * new_height)  # proporcional

        final_img = final_img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Crear fondo blanco tamaño fijo
        bg = Image.new("RGB", target_size, (255, 255, 255))

        # Posición centrada horizontalmente (en el ancho)
        paste_x = (target_size[0] - new_width) // 2
        paste_y = 0  # arriba, ya que altura es fija

        bg.paste(final_img, (paste_x, paste_y))

        bg.save(output_path)

print("✅ Imágenes procesadas y guardadas en la carpeta 'output'")
