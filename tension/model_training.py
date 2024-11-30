import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar los datos
df = pd.read_csv('data/hypertension_data.csv')
df = df[['age', 'sex', 'trestbps', 'restecg', 'cp', 'thalach', 'exang', 'target']]

# Analizar la correlación entre características y la etiqueta target
correlation_matrix = df.corr()

# Seleccionar características más correlacionadas con target
correlation_threshold = 0.2  # Umbral de correlación
correlated_features = correlation_matrix['target'][abs(correlation_matrix['target']) > correlation_threshold].index.tolist()
correlated_features.remove('target')
X = df[correlated_features].values
y = df['target'].values

# Dividir los datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalar los datos
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Definir el modelo
model = Sequential()
model.add(Dense(64, input_dim=len(correlated_features), activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(16, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(4, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# Compilar el modelo
from tensorflow.keras.optimizers import Adam
model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# Entrenar el modelo
history = model.fit(X_train, y_train, epochs=100, batch_size=32, validation_data=(X_test, y_test))

# Evaluar el modelo
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Accuracy: {accuracy}')

# Predecir con el modelo
probabilities = model.predict(X_test)
predictions = (probabilities > 0.5).astype(int)
for i in range(10):
    print(f"Predicted: {predictions[i][0]}, Actual: {y_test[i]}")

# Graficar la pérdida durante el entrenamiento y la validación
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.title('Loss over Epochs')
plt.show()
