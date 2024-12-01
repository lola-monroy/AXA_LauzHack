import joblib
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import requests

# Definir la API con Flask
app = Flask(__name__)

# Cargar el modelo entrenado y el scaler
model = load_model('hypertension_model.h5')
scaler = joblib.load('scaler.save')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener los datos del cuerpo de la solicitud que llega del frontend
        data = request.get_json()

        # Verificar si los datos contienen los campos requeridos
        if not all(key in data for key in ['blood_pressure', 'heart_rate', 'ecg', 'heart_rate_variability', 'steps']):
            return jsonify({'error': 'Faltan datos necesarios'}), 400

        # Preprocesar los datos recibidos
        features = np.array([[
            data['blood_pressure'],
            data['heart_rate'],
            data['ecg'],
            data['heart_rate_variability'],
            data['steps']
        ]])
        features_scaled = scaler.transform(features)

        # Realizar la predicción
        probabilities = model.predict(features_scaled)
        result = float(probabilities[0][0])

        return jsonify({'probability': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
