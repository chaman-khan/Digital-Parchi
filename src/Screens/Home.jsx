import React, {useEffect} from 'react';
import ProductsListing from '../Components/ProductsListing';
import CustomIncrementer from '../Components/CustomIncrementer';

const Home = ({navigation}) => {
  return (
    <ProductsListing
      onPress={id => {
        navigation.navigate('ProductDetails', {
          productID: id,
          showIncrementar: true,
        });
      }}
      ListButtonComponent={id => {
        return <CustomIncrementer ProductID={id.ProductID} />;
      }}
    />
  );
};

export default Home;
