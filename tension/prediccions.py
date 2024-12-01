import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

model = load_model('tension/hypertension_model.h5')
scaler = joblib.load('tension/scaler.save')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener los datos del cuerpo de la solicitud que llega del frontend
        data_json = request.get_json()[0]
        print(data_json)

        # Verificar si los datos contienen los campos requeridos
        if not all(key in data_json for key in ['cp', 'thalach', 'exang']):
            return jsonify({'error': 'Faltan datos necesarios'}), 400

        # Preprocesar los datos recibidos
        features = np.array([[
            data_json['cp'],
            data_json['thalach'],
            data_json['exang'],

        ]])
        features_scaled = scaler.transform(features)

        # Realizar la predicción
        probabilities = model.predict(features_scaled)
        result = float(probabilities[0][0])

        return jsonify({'probability': result})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

arima = joblib.load('tension/arima.joblib')
@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        data_json = request.get_json()
        print(data_json)

        prediction = arima.apply(data_json['bpm']).forecast(steps=5)
        return jsonify({'forecast': prediction.tolist()})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
