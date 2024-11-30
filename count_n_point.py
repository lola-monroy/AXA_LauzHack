import cv2
import numpy as np

# Cargar la imagen
image = cv2.imread("C:/Users/Lola Monroy Mir/OneDrive/Escritorio/AXA_LauzHack-1/pill1.jpeg")
if image is None:
    print(f"Error: Image not found or cannot be opened. Check the file path.")
    exit()

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)



# Convertir a binaria
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

# Encontrar contornos
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Inicializar listas para almacenar redondas y alargadas
round_pills = []
long_pills = []

# Clasificar objetos
for contour in contours:
    # Calcular propiedades geométricas
    area = cv2.contourArea(contour)
    if area > 100:  # Filtrar objetos pequeños (ajustar el umbral según la imagen)
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = float(w) / h
        eccentricity = abs(w - h) / max(w, h)
        
        # Clasificar según aspecto y excentricidad
        if eccentricity < 0.3:  # Redondas
            round_pills.append((x, y, w, h))
        else:  # Alargadas
            long_pills.append((x, y, w, h))

# Contar el número requerido de pastillas
point_round = 2  # Número de redondas que quiero contar
point_long = 1   # Número de alargadas que quiero contar

# Verificar si hay suficientes redondas
if len(round_pills) < point_round:
    print(f"Error: {point_round} round pills are required, but only {len(round_pills)} were found.")
else:
    for i in range(point_round):
        x, y, w, h = round_pills[i]
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)  # Dibujar en azul

# Verificar si hay suficientes alargadas
if len(long_pills) < point_long:
    print(f"Error: {point_long} long pill is required, but only {len(long_pills)} was found.")
else:
    x, y, w, h = long_pills[0]
    cv2.rectangle(image, (x, y), (x+w, y+h), (0, 0, 255), 2)  # Dibujar en rojo

# Redimensionar la imagen al 50% de su tamaño original
scale_percent = 50  # Cambia este valor para ajustar la escala
width = int(image.shape[1] * scale_percent / 100)
height = int(image.shape[0] * scale_percent / 100)
dim = (width, height)

resized_image = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)


# Mostrar la imagen
image = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
cv2.imshow("Highlighted Pills", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
