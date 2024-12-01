import pandas as pd
import joblib
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.optimizers import Adam


df = pd.read_csv('data/hypertension_data.csv')
df = df[['age', 'sex', 'trestbps', 'restecg', 'cp', 'thalach', 'exang', 'target']]

correlation_matrix = df.corr()

correlation_threshold = 0.2  # Umbral de correlación
correlated_features = correlation_matrix['target'][abs(correlation_matrix['target']) > correlation_threshold].index.tolist()
correlated_features.remove('target')
print(correlated_features)


X = df[correlated_features].values
# X = df[['age', 'sex', 'trestbps', 'restecg', 'cp', 'thalach', 'exang']].values
# print(X.columns)
y = df['target'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = Sequential()
model.add(Dense(128, input_dim=3, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(16, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(4, activation='relu'))
model.add(Dense(2, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

from tensorflow.keras.optimizers import Adam
model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

model.fit(X_train, y_train, epochs=70, batch_size=32, validation_data=(X_test, y_test))

loss, accuracy = model.evaluate(X_test, y_test)
print(f'Accuracy: {accuracy}')

probabilities = model.predict(X_test)
predictions = (probabilities > 0.5).astype(int)
for i in range(10):
    print(f"Predicted: {predictions[i][0]}, Actual: {y_test[i]}")

model.save("tension/hypertension_model.h5")
joblib.dump(scaler, 'tension/scaler.save')