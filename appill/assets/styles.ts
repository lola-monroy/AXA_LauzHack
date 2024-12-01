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
    paddingTop:10
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
    borderRadius: 10,
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
  buttonMenu: {
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background color
    borderColor: '#00008F', // Blue border color
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 15, // Add space between buttons
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
    paddingTop: '10%',
    paddingBottom: '10%',
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: -5 },
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  legendText: {
    fontSize: 18,
    paddingRight:2,
  },
  pillCountText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
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
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadContainer: {
    alignItems: 'center',
  },
  pillsVector: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  backgroundSurface: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: '#d24723',
    padding: 10,
    borderRadius: 0,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: -1,
  },
  uploadIcon: {
    marginRight: 10,
    color: '#00008f' // Add space between icon and text
  },
});

export default styles;