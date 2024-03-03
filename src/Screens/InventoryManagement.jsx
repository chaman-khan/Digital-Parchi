import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomHeader from '../Components/CustomHeader';
import ProductsListing from '../Components/ProductsListing';
import Theme from '../Theme/Theme';

const InventoryManagement = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CustomHeader
        title="Inventory Management"
        onPressBack={() => navigation.goBack()}
      />
      <ProductsListing
        onPress={id => {
          navigation.navigate('ProductDetails', {
            productID: id,
            showIncrementar: false,
          });
        }}
        ListButtonComponent={id => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProduct', {
                  productID: id.ProductID,
                })
              }
              style={{
                width: 30,
                height: 30,
                backgroundColor: Theme.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                borderRadius: 5,
                top: 5,
                right: 5,
              }}>
              <Entypo name="edit" color="white" size={20} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default InventoryManagement;
