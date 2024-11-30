import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  highlight: {
    color: '#d24723', // Highlight color
  },
  subtitle: {
    fontSize: 20,
    color: '#666666',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'column', // Display buttons vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background color
    borderColor: '#00008F', // Blue border color
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 15, // Add space between buttons
    width: 250, // Fixed width for buttons
    height: 150, // Fixed height for buttons
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  buttonPressed: {
    backgroundColor: '#00008F', // Blue background color when pressed
  },
  icon: {
    marginBottom: 10, // Add space between icon and text
  },
  buttonText: {
    fontSize: 18,
    color: '#00008F', // Blue text color
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  buttonTextPressed: {
    color: '#FFFFFF', // White text color when pressed
  },
});

export default styles;