import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Montserrat',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background color
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00008f',
    marginBottom: 10,
 },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    //borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    borderRadius: 10,
  },
  highlight: {
    color: '#d24723', // Highlight color
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
  graphContainer: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00008F',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  legendText: {
    fontSize: 16,
    paddingRight:2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 5,
  }
});

export default styles;