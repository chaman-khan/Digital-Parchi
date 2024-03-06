import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import InventoryManagement from '../../Screens/InventoryManagement';
import AddProduct from '../../Screens/AddProduct';
import HomeTab from '../Tabs';
import ProductDetails from '../../Screens/ProductDetails';
import Invoice from '../../Screens/Invoice';
import EditProduct from '../../Screens/EditProduct';
import {useSnackbar} from '../../Components/CustomSnackBar';
import {cartData, removeFromOfflineCart} from '../../Features/NawanSlice';
import Theme from '../../Theme/Theme';
import CustomerInfo from '../../Screens/customerInfo';
import ContactUs from '../../Screens/contactUs';

const HomeStack = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const {offlineCartItems} = useSelector(state => state.NawanSlice);
  const [isOnline, setIsOnline] = useState(false);
  const {showSnackbar} = useSnackbar();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOnline && offlineCartItems.length !== 0) {
      showSnackbar(
        `Uploading 1 of ${offlineCartItems.length} bills saved offline`,
        Theme.colors.secondary,
      );
      dispatch(
        cartData(
          offlineCartItems[offlineCartItems.length - 1],
          onSuccess,
          onError,
        ),
      );
    }
  }, [isOnline, offlineCartItems]);

  const onSuccess = res => {
    dispatch(removeFromOfflineCart());
  };

  const onError = err => {};

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
      <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
};

export default HomeStack;
