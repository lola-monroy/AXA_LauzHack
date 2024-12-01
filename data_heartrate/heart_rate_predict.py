import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import pandas as pd
import joblib

# Cargar los datos
heart_rate_data = pd.read_csv('heart_rate.csv')

# Normalizar los datos
scaler = MinMaxScaler()
heart_rate_scaled = scaler.fit_transform(heart_rate_data.values)

# Guardar el scaler
joblib.dump(scaler, 'scaler.save')

# Crear el dataset para entrenamiento con ventana de tiempo fija
time_step = 60

def create_dataset(data, time_step=60):
    X, y = [], []
    for i in range(len(data) - time_step):
        X.append(data[i:(i + time_step), 0])
        y.append(data[i + time_step, 0])
    return np.array(X), np.array(y)

X, y = create_dataset(heart_rate_scaled, time_step)

# Dividir los datos en entrenamiento y prueba
train_size = int(len(X) * 0.8)
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Remodelar los datos para que sean compatibles con LSTM [samples, time steps, features]
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

# Crear y compilar el modelo LSTM
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(time_step, 1)),
    LSTM(50, return_sequences=True),
    LSTM(50),
    Dense(1)
])
model.compile(optimizer='adam', loss='mean_squared_error')

# Entrenar el modelo
model.fit(X_train, y_train, epochs=10, batch_size=1)

# Guardar el modelo
model.save('heart_rate_lstm_model.h5')

# Predecir los valores del conjunto de prueba
predictions = model.predict(X_test)
predictions = scaler.inverse_transform(predictions)

# Graficar resultados
plt.plot(heart_rate_data.values[train_size + time_step:], label='Actual Heart Rate')
plt.plot(predictions, label='Predicted Heart Rate')
plt.xlabel('Time')
plt.ylabel('Heart Rate')
plt.legend()
plt.show()

# Calcular el RMSE
rmse = np.sqrt(mean_squared_error(heart_rate_data.values[train_size + time_step:], predictions.flatten()))
print(f'RMSE: {rmse}')
