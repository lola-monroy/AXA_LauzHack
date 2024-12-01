import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from './StartPage';
import PressurePage from './PressurePage';
import PillsPart from './Pillspart';


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
        <Stack.Screen
          name="PillsPage"
          component={PillsPart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default App;