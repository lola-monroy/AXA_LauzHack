# APPILL
# Medication and Tension Monitoring App
This project is designed to assist elderly users in managing their medication and monitoring health data through a cross-platform mobile app. It integrates pill shape detection, hypertension prediction, and smartwatch data simulation.
## Key Features
- **Add Medication Information**: Users can add basic information like dosage, and schedule.
- **Verify Medication Taken**: By taking a picture of the pill, the app will apply computer vision operations to ensure that the correct pill has been taken.
- **Secure Data Storage**: We store user data in a secure way, localy, to ensure privacy.
- **Hypertension Risk Prediction**: Machine learning model predicts the likelihood of hypertension using health metrics, keeping them simple without doing overkill.
- **Smartwatch Data Simulation**: Generates simulated health data, including heart rate, variability, and steps, for health tracking and alerts.

## Technologies Used
- **React Native:** For building a cross-platform mobile app with a simple and intuitive interface, designed for elderly users.
- **MATLAB (Image Processing):** Used to prototype pill recognition algorithms based on basic morphological operations like erosions and contour detection. Later converted to a python script for better manipulation. 
- **Python:** Backend implementation of image processing algorithms, transitioning from MATLAB for better integration with the app and scalability.

## File structure
### Main Project
- apill/: app, components, assets, hooks, scripts: Mobile app code written in React Native.
        package.json & package-lock.json: Dependency management for the mobile app​
- tsconfig.json: TypeScript configuration for the app.
- README.md: Documentation for the project

### Counting pills
- count_python.py: Script for detecting and counting pills using OpenCV and scikit-image​
- pillX.jpeg: Sample pill images for testing.
- count_matlab.m & count_matlab_note.mlx: MATLAB scripts for prototyping pill recognition algorithms.

### Hypertension prediction
- data_hypertension/hypertension_data.csv: Dataset for training the hypertension prediction model.
tension/:
- hypertension_model.h5: Saved trained model.
- model_training.py: Model training script using TensorFlow/Keras​
- prediccions.py: Flask API for making predictions​
- scaler.save: Scaler object for data normalization.

### Smartwatch simulation 
- smartwatch.py: Simulates smartwatch data for health metrics like heart rate and steps​.

## Future Improvements
- **Accessibility Features**: Provide audio instructions for better accessibility.
- **Take the photo on the spot**: Instead of having to upload it from computer.


## Contributing
If you want to contribute, please fork the repository, make your changes, and submit a pull request. We welcome all improvements and suggestions!

## License
This project is licensed under the MIT License.

