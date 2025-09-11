// @ts-nocheck
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import screens from './config/screens';

// 👉 import thêm Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const Stack = createStackNavigator();
const defaultOptions = {
  headerShown: false,
  title: 'Your Screen',
};

const App = () => {
  const initialScreen = 'signin'; // Đ

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                  title: screenName,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
