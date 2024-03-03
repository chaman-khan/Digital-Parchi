import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../Screens/Login';
import BookDemo from '../../Screens/BookDemo';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BookDemo" component={BookDemo} />
    </Stack.Navigator>
  );
};

export default AuthStack;
