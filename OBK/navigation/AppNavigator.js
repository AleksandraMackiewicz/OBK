// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from '../app/index'; // Import Home screen (App)
import Inside from '../app/inside'; // Import Inside screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index"
                        screenOptions={{
                        headerShown: false, // Disable header for all screens
      }}>
        <Stack.Screen name="index" component={Index} />
        {/* <Stack.Screen name="inside" component={Inside} /> */}


        <Stack.Screen 
          name="inside" 
          component={Inside} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* <Image 
                  source={require('../assets/left-arrow.png')} // Assuming you have a left-arrow.png in assets
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                /> */}
              </TouchableOpacity>
            ),
            headerTitle: '',
          })}
        />


        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
