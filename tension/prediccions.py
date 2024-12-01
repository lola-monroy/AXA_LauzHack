import joblib
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import requests

# Definir la API con Flask
app = Flask(__name__)

# Cargar el modelo entrenado y el scaler
model = load_model('tension/hypertension_model.h5')
scaler = joblib.load('tension/scaler.save')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener los datos del cuerpo de la solicitud que llega del frontend
        data = request.get_json()
        print(data)

        # Verificar si los datos contienen los campos requeridos
        if not all(key in data for key in ['cp', 'thalach', 'exang']):
            return jsonify({'error': 'Faltan datos necesarios'}), 400

        # Preprocesar los datos recibidos
        features = np.array([[
            data['cp'],
            data['thalach'],
            data['exang'],

        ]])
        features_scaled = scaler.transform(features)

        # Realizar la predicción
        probabilities = model.predict(features_scaled)
        result = float(probabilities[0][0])

        return jsonify({'probability': result})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
