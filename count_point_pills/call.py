from PIL import Image
import base64
import io
import json
import socket

# Paso 1: Leer la imagen utilizando PIL
image_path = './count_point_pills/pill3.jpeg'
image = Image.open(image_path)

# Paso 2: Convertir la imagen a base64
buffered = io.BytesIO()
image.save(buffered, format="JPEG")
img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

# Paso 3: Preparar los datos para enviar a MATLAB
data = {
    "pills": img_base64,
    "num_long": 2,  # Cambia según tus necesidades
    "num_round": 3  # Cambia según tus necesidades
}
data_str = json.dumps(data)

# Paso 4: Enviar los datos a MATLAB utilizando un socket
HOST = 'localhost'  # Dirección IP del servidor MATLAB
PORT = 8000         # Puerto del servidor MATLAB

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(data_str.encode('utf-8'))
    
    # Recibir respuesta desde MATLAB
    response = s.recv(1024)
    print('Respuesta de MATLAB:', response.decode('utf-8'))
