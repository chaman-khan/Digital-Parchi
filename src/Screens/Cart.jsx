import React, {useEffect, useState, useMemo} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  clearCart,
  cartData,
  updateOfflineCart,
} from '../Features/NawanSlice';
import NetInfo from '@react-native-community/netinfo';
import CustomIncrementer from '../Components/CustomIncrementer';
import Theme from '../Theme/Theme';
import {useSnackbar} from '../Components/CustomSnackBar';

const {width} = Dimensions.get('window');

const Cart = () => {
  const {products} = useSelector(state => state.app);
  const {cartItems} = useSelector(state => state.NawanSlice);
  const {userId} = useSelector(state => state.pin);
  const dispatch = useDispatch();
  const {showSnackbar} = useSnackbar();

  const [isOnline, setIsOnline] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const ReformatedData = useMemo(() => {
    return Object.keys(cartItems).map(key => {
      const Item = products.find(item => item.id === key);
      return {
        productID: key,
        image: Item?.Image,
        price: Item?.Unit_Price,
        name: Item?.Name,
      };
    });
  }, [cartItems, products]);

  const handleArrangingProducts = useMemo(() => {
    return ReformatedData.map(item => ({
      id: item.productID,
      Name: item.name,
      Quantity: cartItems[item.productID],
      Price: item.price,
    }));
  }, [ReformatedData, cartItems]);

  const totalPrice = useMemo(() => {
    return handleArrangingProducts.reduce(
      (prev, curr) => prev + parseFloat(curr.Price) * parseInt(curr.Quantity),
      0,
    );
  }, [handleArrangingProducts]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleRemoveFromCart = productId => {
    dispatch(removeFromCart(productId));
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <View style={styles.productTopContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productPrice}>
          Rs. {parseFloat(item.price) * parseInt(cartItems[item.productID])}
        </Text>
      </View>
      <View style={styles.productNameContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.productID)}>
          <Text style={styles.removeProduct}>REMOVE</Text>
        </TouchableOpacity>
      </View>
      <CustomIncrementer ProductID={item.productID} />
    </View>
  );

  const saveBills = async Print_Status => {
    setShowActivity(true);
    let data = {
      Business_ID: userId,
      products: handleArrangingProducts,
      Print_Status: Print_Status,
    };
    if (isOnline) {
      dispatch(cartData(data, onSuccess, onError));
      console.log(data);
    } else {
      dispatch(updateOfflineCart(data));
      showSnackbar('Success : Data Saved Offline!', Theme.colors.secondary);
      setShowActivity(false);
    }
  };

  const printBills = async () => {
    try {
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
      await BluetoothEscposPrinter.ALIGN.CENTER;
      await BluetoothEscposPrinter.printPic(logo, {width: 250, left: 50});
      await BluetoothEscposPrinter.printText('\n\r', {});

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      await BluetoothEscposPrinter.printText(
        `Date: ${formattedDate} ${formattedTime}\n\r`,
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\n\r',
        {},
      );

      const columnWidths = [6, 10, 5, 8];
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Index', 'Items', 'Quan', 'Price'],
        {},
      );
      await BluetoothEscposPrinter.printText('\n\r', {});

      for (let [index, item] of handleArrangingProducts.entries()) {
        await BluetoothEscposPrinter.printColumn(
          columnWidths,
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [
            (index + 1).toString(),
            item.Name,
            item.Quantity.toString(),
            item.Price.toString(),
          ],
          {},
        );
        await BluetoothEscposPrinter.printText('\n\r', {});
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\n\r',
        {},
      );

      const totalQuantity = handleArrangingProducts.reduce(
        (acc, item) => acc + item.Quantity,
        0,
      );

      await BluetoothEscposPrinter.printColumn(
        [6, 10, 5, 8],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['Total', '', totalQuantity.toString(), totalPrice.toString()],
        {},
      );

      await BluetoothEscposPrinter.printText('\n\r', {});
      await BluetoothEscposPrinter.printText(
        '--------------------------------\n\r',
        {},
      );
      await BluetoothEscposPrinter.printText(
        'Thanks for visiting here.\n\r',
        {},
      );
      await BluetoothEscposPrinter.printText('\n\r', {});
      await BluetoothEscposPrinter.printText(
        'Powered By @ DigitalParchi\n\r',
        {},
      );

      saveBills('Print');
      dispatch(cartData(data));
      console.log('CART---------------------------->', handleArrangingProducts);
    } catch (error) {
      console.error('Error printing bill:', error);
    }
  };

  const onSuccess = () => {
    setShowActivity(false);
    dispatch(clearCart());
    showSnackbar('Success : Data Saved!', 'green');
  };

  const onError = () => {
    setShowActivity(false);
    showSnackbar('Error : Something went wrong!', 'red');
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={ReformatedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.cartEmpty}>Your Cart is empty</Text>
        }
      />
      {Object.keys(cartItems).length !== 0 && (
        <View style={styles.bottomContainer}>
          <Text style={styles.totalAmountText}>
            Total Amount: Rs. {totalPrice.toFixed(2)}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={printBills}>
              <Text style={styles.buttonText}>Print Bill</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => saveBills('Save')}>
              <Text style={styles.buttonText}>Save Bill</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingBottom: 70,
    paddingTop: 5,
  },
  productContainer: {
    width: width - 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#eeeeee',
    marginVertical: 5,
    overflow: 'hidden',
  },
  productTopContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productPrice: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productNameContainer: {
    backgroundColor: '#eeeeee',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    width: width - 100,
  },
  removeProduct: {
    color: 'red',
    fontWeight: '600',
    fontSize: 12,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 85,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartEmpty: {
    color: Theme.colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: width / 1.5,
    fontWeight: '500',
  },
});

export default Cart;

//keep this code...
