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
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
const {width, height} = Dimensions.get('screen');

const AddProduct = ({navigation}) => {
  const [select, setSelect] = useState(false);
  const [source, setSource] = useState(require('../assets/logo5.png'));
  const [Name, setName] = useState('');
  const [Unit_Price, setUnit_Price] = useState('');
  const [Description, setDescription] = useState('');

  const gallery = () => {
    ImagePicker.openPicker({}).then(images => {
      console.log(images);
      setSource(images.path);
    });
  };
  const isLandscape = () => {
    // Detect landscape mode
    const {width, height} = Dimensions.get('window');
    return width > height;
  };
  console.log(Unit_Price);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Add New Product
        </Text>
        <BackIcon name="arrow-back" size={25} color={'transparent'} />
      </View>

      <ScrollView>
        <View className="px-4">
          <TouchableOpacity
            activeOpacity={1}
            onPress={gallery}
            className="border-b w-full py-3 items-center border-b-gray-300">
            <Image
              source={source}
              style={
                isLandscape()
                  ? {width: 300, height: 300}
                  : {width: 200, height: 300}
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              gap: 10,
            }}>
            <View style={{gap: 10}}>
              <Text style={{color: '#6755A4', fontSize: 20}}>Product Name</Text>
              <TextInput
                style={styles.input}
                value={Name}
                onChangeText={txt => setName(txt)}
                multiline
              />
            </View>
            <View style={{gap: 10}}>
              <Text style={{color: '#6755A4', fontSize: 20}}>
                Product Price
              </Text>
              <View style={styles.price}>
                <Text style={{color: 'black', fontSize: 15}}>Rs.</Text>
                <TextInput
                  value={Unit_Price}
                  keyboardType="numeric"
                  onChangeText={txt => setUnit_Price(txt)}
                  style={{width: '90%', color: 'black', fontSize: 15}}
                />
              </View>
            </View>
            <View style={{gap: 10}}>
              <Text style={{color: '#6755A4', fontSize: 20}}>Description</Text>
              <TextInput
                style={{...styles.input, height: 100}}
                className="text-lg"
                value={Description}
                onChangeText={txt => setDescription(txt)}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.updateButton}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Add
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#6755A4',
  },
  updateButton: {
    width: 130,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6755A4',
    borderRadius: 20,
    marginVertical: 20,
  },
  modal: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: height / 3,
  },
  done: {
    color: '#6755A4',
    fontSize: 20,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#6755A4',
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    fontSize: 15,
  },
  price: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#6755A4',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default AddProduct;
