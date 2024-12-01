import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, Button, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../assets/styles'; // Import the styles

const PressureGraph = () => {
  const { width, height } = useWindowDimensions();
  const chartHeight = height * 0.4; // 40% of the window height
  const [alertBlocked, setAlertBlocked] = useState(false);

    const [data, setData] = useState<{ bpm: number[] }>({
        bpm: [],
    });

    const [risk, setRisk] = useState<{ prob: number[] }>({
        prob: [],
    });

    const fetchPrediction = (measures: any)  => {
        fetch('http://127.0.0.1:3000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(measures),
        })
        .then((response) => response.json())
        .then((json) => {
            setRisk((prevRisk) => {
                const newProb = [...prevRisk.prob];
                // Ensure the array has at least 100 elements
                while (newProb.length < 100) {
                    newProb.push(0);
                }
                newProb.push(json.probability);
                if (newProb.length > 100) {
                    // Remove the first element if the array has more than 100 elements
                    newProb.shift();
                }
                if (json.probability > 0.5 && !alertBlocked) {
                  console.log('Showing alert');
                  setAlertBlocked(true);
                  setTimeout(() => async () => {
                    setAlertBlocked(false);
                    console.log('Alert unblocked');
                  }, 30000); // Block alerts for 30 seconds
                } 
                return {
                    prob: newProb,
                };
            });
        })
    }

    const fetchForecast = async (measures: any)  => {
        const forecast = await fetch('http://127.0.0.1:3000/forecast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(measures.bpms),
        }).then((response) => response.json())

        // for each bpm forecasted, predict its risk and assign it to risk_forecast
        const risk_forecast = await Promise.all( forecast.forecast.map(async (bpm: number) => {
            const measures_forecast = [{ thalach: bpm, cp: measures.cp, exang: measures.exang}];
            const risk_forecast = await fetch('http://127.0.0.1:3000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(measures_forecast),
            }).then((response) => response.json())
            return await risk_forecast.probability;
        }));
      console.log("PREDICTION");
      console.log(forecast.forecast);
        console.log(risk_forecast);

        // return both bpm and risk_forecast
        return {bpms: forecast, risks: risk_forecast};
    }

  const fetchData = () => {
    fetch('http://127.0.0.1:5000/smartwatch')
      .then((response) => response.json())
      .then((json) => {
        setData((prevData) => {
            const newBpm = [...prevData.bpm];
            // Ensure the array has at least 100 elements
            while (newBpm.length < 5) {
              newBpm.push(0);
            }
            newBpm.push(json.heart_rate);
            if (newBpm.length > 5) {
              // Remove the first element if the array has more than 100 elements
              newBpm.shift();
            }

            // Get all the fields from the response in a dictionary
            const measures = [{ thalach: json.heart_rate, cp: json.heart_rate_variability > 0.17 ? 2 : json.heart_rate_variaility > 0.13 ? 1 : 0, exang: json.steps > 30 ? 1 : 0}]
            // send this data to the endpoint 3000
            fetchPrediction(measures);

            return {
              bpm: newBpm,
            };
          });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
    //const forecast = fetchForecast({ bpms: data, cp: 0, exang: 0 });
    //console.log("FORECAST");
    //console.log(forecast);
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={styles.graphContainer}>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
          <Text style={styles.legendText}>Hipertension episode risk</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: ['-25s', '-20s', '-15s', '-10s', '-5s', 'now', '+5s', '+10s', '+15s', '+20s', '+25s'], // Months
          datasets: [
            {
              data: risk.prob.slice(-6).map((x) => x * 100), // .concat([0,0,0,0,0])
              color: (opacity = 1) => `#00008F`, // Red color for systolic pressure
              strokeWidth: 4, // optional
            }
          ],
        }}
        width={width - 40} // Adjust width to be responsive
        height={chartHeight} // Set height as a percentage of window height
        yAxisLabel=""
        yAxisSuffix="%"
        yLabelsOffset={0}
        fromZero={true}
        yAxisInterval={1} 
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16, // Replace with your custom font name
          },
          propsForDots: {
            r: '5',
            strokeWidth: '5',
          },
          propsForLabels: {
            fontSize: 12, // Adjust font size for x-axis labels
            fontWeight: 'thin', // Make x-axis labels bold
            fill: '#00008F',
            fontFamily: 'Montserrat', 
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginHorizontal: 20, // Add margin to the sides
        }}
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Heartbeat rate</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels:['-25s', '-20s', '-15s', '-10s', '-5s', 'now', '+5s', '+10s', '+15s', '+20s', '+25s'], // Months
          datasets: [
            {
              data: data.bpm.slice(-6),//.concat([64,64,64,64,64]),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for systolic pressure
              strokeWidth: 4, // optional
            }
          ],
        }}
        width={width - 40} // Adjust width to be responsive
        height={chartHeight} // Set height as a percentage of window height
        yAxisLabel=""
        yAxisSuffix="bpm"
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true} 
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16, // Replace with your custom font name
          },
          propsForDots: {
            r: '5',
            strokeWidth: '5',
          },
          propsForLabels: {
            fontSize: 12, // Adjust font size for x-axis labels
            fontWeight: 'thin', // Make x-axis labels bold
            fill: '#00008F',
            fontFamily: 'Montserrat', 
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginHorizontal: 20, // Add margin to the sides
        }}
      />
    </View>
  );
};

export default PressureGraph;