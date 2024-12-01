# APPILL - Medication Reminder and Tension Monitoring App for Elderly Users
## Overview
This application is designed to help elderly users manage their medication easily and effectively. It allows users to store information about their medications, set reminders for taking pills, and verify that they have taken the correct one using photo recognition.

## Key Features
- **Add Medication Information**: Users can add new medications by taking a picture of the pill and entering basic information like name, dosage, and schedule.
- **Medication Reminders**: The app will notify users when it's time to take their medication.
- **Verify Medication Taken**: By taking a picture of the pill, the app will apply computer vision operations to ensure that the correct pill has been taken.

## Installation
To run this app locally, follow the steps below:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/medication-reminder-app.git
   ```
2. Navigate to the app directory:
   ```sh
   cd medication-reminder-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Technologies Used
- **React Native**: For creating a cross-platform mobile app.
- **MATLAB** (for image processing): Scripts used for recognizing the shape of pills using basic image processing techniques like erosions and other morphological operations.

## Usage
1. **Adding a Pill**:
   - Open the app and select "Add Medication."
   - Take a picture of the pill and fill in the required details (name, dosage, etc.).
2. **Setting a Reminder**:
   - Go to "Reminders" and schedule when you need to take each medication.
3. **Verification**:
   - When it's time to take a pill, use the "Verify" feature to take a photo and ensure it matches the stored image.

## Future Improvements
- **Enhanced Shape Recognition**: Improve the accuracy of pill recognition.
- **Accessibility Features**: Provide audio instructions for better accessibility.
- **Secure Data Storage**: Store user data in a secure way to ensure privacy.

## Contributing
If you want to contribute, please fork the repository, make your changes, and submit a pull request. We welcome all improvements and suggestions!

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please reach out to [youremail@example.com].

