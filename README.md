# APPILL
# Medication Reminder and Tension Monitoring App
## Overview
This application is designed to help elderly users who suffer or are vulnerable to hypertension, manage their medication easily and effectively, as well as monitor their tension. It allows users to store information about their medications, set reminders for taking pills, and verify that they have taken the correct one using photo recognition. Its purpose is to provide a simple and intuitive interface in order to make it easier for those who have a harder time with technologies, to exploit the advantadges of technologies. 

## Key Features
- **Add Medication Information**: Users can add new medications by taking a picture of the pill and entering basic information like name, dosage, and schedule.
- **Medication Reminders**: The app will notify users when it's time to take their medication.
- **Verify Medication Taken**: By taking a picture of the pill, the app will apply computer vision operations to ensure that the correct pill has been taken.
- **Secure Data Storage**: We store user data in a secure way, localy, to ensure privacy.

## Technologies Used
- **React Native:** For building a cross-platform mobile app with a simple and intuitive interface, designed for elderly users.
- **MATLAB (Image Processing):** Used to prototype pill recognition algorithms based on basic morphological operations like erosions and contour detection. Later converted to a python script for better manipulation. 
- **Python:** Backend implementation of image processing algorithms, transitioning from MATLAB for better integration with the app and scalability.

## Future Improvements
- **Accessibility Features**: Provide audio instructions for better accessibility.
- **Take the photo on the spot**: Instead of having to upload it from computer


## Contributing
If you want to contribute, please fork the repository, make your changes, and submit a pull request. We welcome all improvements and suggestions!

## License
This project is licensed under the MIT License.

