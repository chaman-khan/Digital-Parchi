import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InventoryManagement from '../../Screens/InventoryManagement';
import AddProduct from '../../Screens/AddProduct';
import HomeTab from '../Tabs';
import ProductDetails from '../../Screens/ProductDetails';
import Invoice from '../../Screens/Invoice';
import EditProduct from '../../Screens/EditProduct';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        name="InventoryManagement"
        component={InventoryManagement}
      />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="Invoice" component={Invoice} />
    </Stack.Navigator>
  );
};

export default HomeStack;
