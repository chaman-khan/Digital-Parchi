import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomHeader from '../Components/CustomHeader';
import CustomIncrementer from '../Components/CustomIncrementer';
import Theme from '../Theme/Theme';
import CustomScrollView from '../Components/CustomScrollView';

const {width, height} = Dimensions.get('window');

const ProductDetails = ({navigation, route}) => {
  const {products} = useSelector(state => state.app);
  const {productID, showIncrementar} = route.params;
  const Item = products.filter(f => f.id === productID)[0];

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title={'Product\tDetails'}
        onPressBack={() => navigation.goBack()}
      />
      <CustomScrollView style={styles.mainContainer}>
        <ImageBackground
          source={{uri: Item.Image}}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}>
          <Text style={styles.priceTag}>
            Rs.{' '}
            <Text style={styles.price}>
              {Item.Unit_Price}{' '}
              <Text
                style={{
                  color: Theme.colors.background,
                }}>
                |
              </Text>
            </Text>{' '}
            <Text
              style={{
                color: Theme.colors.primary,
              }}>
              {Item.Unit}
            </Text>
          </Text>

          {showIncrementar ? (
            <CustomIncrementer ProductID={productID} />
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProduct', {
                  productID: Item.id,
                })
              }
              style={{
                width: 35,
                height: 35,
                backgroundColor: Theme.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                borderRadius: 5,
                bottom: 10,
                right: 10,
              }}>
              <Entypo name="edit" color="white" size={20} />
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={styles.bottomContainer}>
          <TextInput
            value={Item.Name}
            editable={false}
            placeholder="Product Name"
            placeholderTextColor={Theme.colors.background}
            multiline
            keyboardType="default"
            style={styles.title}
          />
          <Text
            style={{
              color: Theme.colors.primary,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {Item.Category}
          </Text>
          <TextInput
            value={Item.Description}
            editable={false}
            placeholder="Product Detail"
            placeholderTextColor={Theme.colors.background}
            multiline
            keyboardType="default"
            style={styles.description}
          />
        </View>
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: 'white',
    resizeMode: 'contain',
    height: height / 2.5,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    width: '100%',
    height: height / 4,
    resizeMode: 'contain',
    marginTop: (height / 2.5 - height / 4) / 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  priceTag: {
    color: Theme.colors.background,
    fontWeight: 'normal',
    fontSize: 14,
    marginLeft: 10,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  bottomContainer: {
    width: width - 20,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: Theme.colors.primary,
    paddingTop: 15,
  },
  title: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    width: '100%',
    paddingHorizontal: 0,
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 0,
  },
});

export default ProductDetails;
