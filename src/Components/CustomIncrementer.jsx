import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import Theme from '../Theme/Theme';
import {updateCart, removeFromCart} from '../Features/NawanSlice';

const CustomIncrementer = ({ProductID}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.NawanSlice);
  const route = useRoute();

  const isPresent = useMemo(
    () => cartItems && cartItems[ProductID],
    [cartItems, ProductID],
  );

  const decrease = useCallback(() => {
    const currentQuantity = parseInt(cartItems[ProductID]);
    if (!isNaN(currentQuantity) && currentQuantity === 1) {
      dispatch(removeFromCart(ProductID));
    } else {
      dispatch(updateCart({[ProductID]: currentQuantity - 1}));
    }
  }, [cartItems, dispatch, ProductID]);

  const increase = useCallback(() => {
    dispatch(
      updateCart({[ProductID]: (parseInt(cartItems[ProductID]) || 0) + 1}),
    );
  }, [cartItems, dispatch, ProductID]);

  const buttonStyles = useMemo(
    () =>
      route.name === 'Home' || route.name === 'Cart'
        ? styles.smallButton
        : styles.largeButton,
    [route.name],
  );

  const wrapperStyle = useMemo(
    () =>
      route.name === 'Home' || route.name === 'Cart'
        ? styles.topRight
        : styles.bottomRight,
    [route.name],
  );

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {isPresent && (
        <>
          <TouchableOpacity
            onPress={decrease}
            activeOpacity={0.5}
            style={buttonStyles}>
            <FontAwesome name="minus" size={20} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.tag}>{cartItems[ProductID]}</Text>
        </>
      )}
      <TouchableOpacity
        onPress={increase}
        activeOpacity={0.5}
        style={buttonStyles}>
        <FontAwesome name="plus" size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  smallButton: {
    width: 30,
    height: 30,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton: {
    width: 40,
    height: 40,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: {
    top: 5,
    right: 5,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
  tag: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 30,
    fontSize: 22,
  },
});

export default CustomIncrementer;
