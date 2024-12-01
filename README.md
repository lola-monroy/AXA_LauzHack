# APPILL
# Medication Reminder and Tension Monitoring App
This project is designed to assist elderly users in managing their medication and monitoring health data through a cross-platform mobile app. It integrates pill shape detection, hypertension prediction, and smartwatch data simulation.
## Key Features
- **Add Medication Information**: Users can add new medications by taking a picture of the pill and entering basic information like name, dosage, and schedule.
- **Medication Reminders**: The app will notify users when it's time to take their medication.
- **Verify Medication Taken**: By taking a picture of the pill, the app will apply computer vision operations to ensure that the correct pill has been taken.
- **Secure Data Storage**: We store user data in a secure way, localy, to ensure privacy.

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

### count_point_pills/:
- count_python.py: Script for detecting and counting pills using OpenCV and scikit-image​
- pillX.jpeg: Sample pill images for testing.
- count_matlab.m & count_matlab_note.mlx: MATLAB scripts for prototyping pill recognition algorithms.

### Hypertension prediction
- model_training.py: Machine learning pipeline to train a model for hypertension prediction​
- prediccions.py: Flask API for hypertension predictions using the trained model​


## Future Improvements
- **Accessibility Features**: Provide audio instructions for better accessibility.
- **Take the photo on the spot**: Instead of having to upload it from computer


## Contributing
If you want to contribute, please fork the repository, make your changes, and submit a pull request. We welcome all improvements and suggestions!

## License
This project is licensed under the MIT License.

