import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from './StartPage';
import PressurePage from './PressurePage';

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{ headerShown: false }} // Optional: Hide header
        />
        <Stack.Screen
          name="PressurePage"
          component={PressurePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default App;