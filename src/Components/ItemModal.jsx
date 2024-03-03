import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  // removeFromCart,
  updateQuantity,
  setSelectedProduct,
} from '../Features/ParchiSlice';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

function SingleItem(props) {
  const selectedProduct = useSelector(state => state.app.selectedProduct);
  const {products} = useSelector(state => state.app);
  const selected = products.find(product => product.id === selectedProduct);
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(1);
  // const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const inCart = useSelector(state =>
    state.app.cartItems.some(item => item.id === selected.id),
  );

  const handleAddToCart = item => {
    if (!inCart) {
      dispatch(addToCart(item));
    }
    if (item.id !== selectedProduct) {
      dispatch(setSelectedProduct(item));
    }
  };

  const updateCartQuantity = item => {
    dispatch(updateQuantity({productId: item.id, quantity: count}));
  };

  // const handleRemoveFromCart = () => {
  //   dispatch(removeFromCart(selected.id));
  // };

  const incrementCount = () => {
    setCount(count + 1);
    // setTotalPrice(selected.price * (count + 1));
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      // setTotalPrice(selected.price * (count - 1));
    }
  };

  if (!selectedProduct) {
    return <Text>Loading...</Text>;
  }

  const handleClose = () => {
    setShow(false);
    props.onClose();
    return true;
  };

  const isLandscape = () => {
    // Detect landscape mode
    const {width, height} = Dimensions.get('window');
    return width > height;
  };

  return (
    <View>
      <Modal
        onRequestClose={handleClose}
        hardwareAccelerated={true}
        animationType="slide">
        <View className="flex-1">
          <View className="relative py-5 bg-[#6755A4] px-2 mb-2 shadow-xl shadow-[#6755A4]">
            <TouchableOpacity
              className="bg-[#6755A4] absolute z-10 top-4 left-4 p-1 rounded-full"
              onPress={handleClose}>
              <BackIcon name="arrow-back" size={25} color={'white'} />
            </TouchableOpacity>
            <Text className="text-lg bg-transparent text-center text-white font-extrabold">
              Digital Parchi
            </Text>
          </View>
          <ScrollView>
            <View className="px-4">
              {/* Adjust image size and description text based on orientation */}
              <View className="border-b w-full py-3 items-center border-b-gray-300">
                <Image
                  source={{uri: `data:image/jpeg;base64,${selected.Image}`}}
                  style={
                    isLandscape()
                      ? {width: 300, height: 300}
                      : {width: 200, height: 300}
                  }
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="font-bold text-xl text-black py-2">
                  {selected.Name}
                </Text>
                <Text className="font-extrabold py-1 pb-5 text-lg text-[#6755A4]">
                  Rs.{selected.Unit_Price}
                </Text>
              </View>
              <View>
                <Text className="text-lg">{selected.quantity}</Text>
              </View>
            </View>
          </ScrollView>

          {/* add to cart button area */}
          <View className="w-full rounded-t-3xl bg-violet-50">
            <TouchableHighlight underlayColor="lightgray">
              <View className="flex-row items-center justify-around mx-5">
                <View className="flex-row items-center justify-center shadow-2xl ml-2 my-4 shadow-[#6755A4] bg-white rounded-full w-32">
                  <TouchableOpacity
                    className="mr-2 pl-2"
                    onPress={decrementCount}>
                    <Text className="text-5xl text-[#6755A4] font-bold pt-2">
                      −
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-2xl font-bold bg-[#6755A4] p-2 px-3 text-white">
                    {count}
                  </Text>
                  <TouchableOpacity
                    className="ml-2 pr-2"
                    onPress={incrementCount}>
                    <Text className="text-4xl text-[#6755A4] font-bold pt-1">
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="bg-gradient-to-r bg-[#6755A4] rounded-full px-2 py-3 w-40 ml-20"
                  onPress={() => {
                    handleAddToCart(selected);
                    updateCartQuantity(selected);
                  }}>
                  <Text className="text-white font-bold text-2xl text-center">
                    {inCart ? 'Update Cart' : 'Add to Cart'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SingleItem;
