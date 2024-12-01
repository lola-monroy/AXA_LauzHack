from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
import joblib

df = pd.read_csv('data/heart_rate.csv')
data = df['T1']
model = ARIMA(data, order=(5,5,5))
results = model.fit()
print(results.summary())

joblib.dump(results, 'tension/arima.joblib')
