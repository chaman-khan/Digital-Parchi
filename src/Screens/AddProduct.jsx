import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';

import DropdownComponent from '../Components/Dropdown';
import CustomHeader from '../Components/CustomHeader';
import CustomScrollView from '../Components/CustomScrollView';
import Theme from '../Theme/Theme';
import {useSnackbar} from '../Components/CustomSnackBar';
import {handlePostProduct} from '../Features/ParchiSlice';
import CustomActivityIndicator from '../Components/CutomActivityIndicator';

const {width, height} = Dimensions.get('screen');

export const CustomInputField = ({
  title,
  placeholder,
  isMultiple = false,
  value,
  setValue,
  keyboardType = 'default',
  isRow = false,
}) => {
  return (
    <View
      style={[
        styles.inputFieldWrapper,
        {
          height: isMultiple ? 150 : 55,
        },
        isRow && {
          width: width / 2 - 15,
        },
      ]}>
      <Text style={styles.inputFieldTag}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        multiline={isMultiple}
        keyboardType={keyboardType}
        placeholderTextColor={Theme.colors.background}
        style={[
          styles.inputField,
          {
            textAlignVertical: isMultiple ? 'top' : 'center',
          },
        ]}
      />
    </View>
  );
};

const AddProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const {showSnackbar} = useSnackbar();
  const {userId} = useSelector(state => state.pin);
  const {products} = useSelector(state => state.app);
  const [showActivity, setShowActivity] = useState(false);

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');

  const handlePickingImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      includeBase64: true,
    }).then(data => {
      setImage({
        uri: data.data,
        name: data.path.split('/').pop(),
      });
    });
  };

  const saveIt = () => {
    if (
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0 ||
      category.length === 0 ||
      unit.length === 0
    ) {
      showSnackbar('Please Fill all Fields');
      return;
    } else if (image === '') {
      showSnackbar('Please upload product image');
      return;
    }
    Keyboard.dismiss();
    setShowActivity(true);
    let data = {
      Description: description,
      Business_ID: userId,
      Name: title,
      Image_Data: image.uri,
      Image_Name: image.name,
      Category: category,
      Unit: unit,
      Price: parseFloat(price.trim()),
    };
    dispatch(handlePostProduct(data, onSuccess, onError));
  };

  const onSuccess = res => {
    setShowActivity(false);
    showSnackbar('Success : Product has been Posted', 'green');
  };

  const onError = err => {
    setShowActivity(false);
    showSnackbar('Failure : Something went wrong!');
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title={`Add Product`}
        onPressBack={() => navigation.goBack()}
      />
      <CustomScrollView>
        <ImageBackground
          source={{uri: `data:image;base64,${image?.uri}`}}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}>
          {!image.uri && (
            <View style={styles.imageEmpty}>
              <Entypo name="plus" color={Theme.colors.primary} size={100} />
            </View>
          )}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handlePickingImage}
          />
        </ImageBackground>

        <CustomInputField
          title="Product Name"
          placeholder={'Title'}
          value={title}
          setValue={setTitle}
        />
        <DropdownComponent
          // data={[...new Set(products.map(product => product.Category))]}
          data={[
            'Bakers',
            'Dairy',
            'Tea & Coffee',
            'Snacks',
            'Biscuits & Cookies',
          ]}
          onDropdownChange={setCategory}
          value={category}
          placeholder="Category"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <CustomInputField
            title="Product Price"
            placeholder={'Rupees'}
            keyboardType="number-pad"
            value={price}
            setValue={setPrice}
            isRow
          />
          <DropdownComponent
            data={['kg', 'ltr']}
            onDropdownChange={setUnit}
            value={unit}
            placeholder="Unit"
            isRow
          />
        </View>
        <CustomInputField
          title="Product Description"
          placeholder={'Detail'}
          value={description}
          setValue={setDescription}
          isMultiple
        />
        <TouchableOpacity style={styles.buttonWrapper} onPress={saveIt}>
          <Text style={styles.buttonTag}>SAVE</Text>
        </TouchableOpacity>
      </CustomScrollView>
      <CustomActivityIndicator showActivity={showActivity} />
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
  imagePicker: {
    flex: 1,
  },
  imageEmpty: {
    position: 'absolute',
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Theme.colors.primary,
  },
  inputFieldWrapper: {
    width: width - 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 15,
    height: 55,
  },
  inputFieldTag: {
    color: Theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    marginLeft: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    top: -10,
  },
  inputField: {
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: '100%',
  },
  buttonWrapper: {
    width: width * 0.7,
    height: 55,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonTag: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddProduct;
