import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import AuthStack from './Stacks/AuthStack';
import HomeStack from './Stacks/HomeStack';

const MainNav = () => {
  const Stack = createNativeStackNavigator();
  const {userId} = useSelector(state => state.pin);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userId !== '' ? 'HomeStack' : 'AuthStack'}
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
          statusBarColor: 'transparent',
          statusBarStyle: 'light',
          statusBarTranslucent: true,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
