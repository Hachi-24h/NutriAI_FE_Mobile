// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from './config/screens';


const Stack = createStackNavigator();

const defaultOptions = {
  headerShown: false,
  title: 'Your Screen', // Có thể thêm một title mặc định
};

const App = () => {
  const initialScreen= 'profile'; //

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="root"
        initialRouteName={initialScreen}
        screenOptions={{
          gestureEnabled: true,
        }}
      >
        {Object.entries(screens).map(([screenName, ScreenComponent]) => (
          <Stack.Screen
            key={screenName}
            name={screenName}
            component={ScreenComponent}
            options={{
              ...defaultOptions,
              title: screenName, // Tự động lấy tên key làm title
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
