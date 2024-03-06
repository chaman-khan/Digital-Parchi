import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomHeader from '../Components/CustomHeader';
import CustomScrollView from '../Components/CustomScrollView';
import Theme from '../Theme/Theme';
import {useSnackbar} from '../Components/CustomSnackBar';
import {CustomInputField} from './AddProduct';
import {useDispatch, useSelector} from 'react-redux';
import {handleGetProfile, handleInvoice} from '../Features/ParchiSlice';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Invoice = ({navigation}) => {
  const {showSnackbar} = useSnackbar();

  const dispatch = useDispatch();
  const userId = useSelector(state => state.pin.userId);
  const {profile} = useSelector(state => state.app);
  const [message, setMessage] = useState(profile.Profile.InvoiceMessage);
  // const logo1 = profile.Profile.Logo;
  const [logo, setLogo] = useState(profile.Profile.Logo);
  const [QR, setQR] = useState(profile.Profile.QR ? profile.Profile.QR : '');

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = () => {
    console.log(userId);
    dispatch(handleGetProfile(userId, onSuccessGetData, onErrorGetData));
    console.log('profile');
    console.log(profile);
  };

  const onSuccessGetData = () => {
    showSnackbar('Success : Invoice data fetched', 'green');
  };

  const onErrorGetData = () => {
    showSnackbar('Error : Check Internet!', 'red');
  };

  const handlePickingImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      includeBase64: true,
    }).then(data => {
      setLogo(data.path);
      // setValue({
      //   uri: data.path,
      //   name: data.path.split('/').pop(),
      //   type: data.mime,
      // });
    });
  };

  const handlePickingImage1 = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      includeBase64: true,
    }).then(data => {
      setQR(data.path);
    });
  };

  const saveIt = () => {
    if (message.length === 0 || logo === '' || QR === '') {
      showSnackbar('Please Enter all data');
      return;
    }
    let updateInvoice = {
      Business_ID: userId, //Compulsary
      InvoiceMessage: message,
      Logo: logo,
      QR: QR,
    };
    dispatch(handleInvoice(updateInvoice, onSuccess, onError));
  };
  const onSuccess = res => {
    showSnackbar('Success: Invoice has been Updated', 'green');
    navigation.goBack();
  };

  const onError = err => {
    showSnackbar('Failure: Something went wrong! Reverting to old product...');
  };
  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title={`Invoice\tManagement`}
        onPressBack={() => navigation.goBack()}
      />
      <CustomScrollView>
        <ImageBackground
          // source={{uri: logo?.uri}}
          source={{uri: logo}}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}>
          {!logo && (
            <View style={styles.imageEmpty}>
              <Entypo name="plus" color={Theme.colors.primary} size={100} />
              <Text
                style={{
                  color: Theme.colors.primary,
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                STORE{'\t'}LOGO
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => handlePickingImage()}
          />
        </ImageBackground>
        <ImageBackground
          source={{uri: QR}}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}>
          {!QR && (
            <View style={styles.imageEmpty}>
              <Entypo name="plus" color={Theme.colors.primary} size={100} />
              <Text
                style={{
                  color: Theme.colors.primary,
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                QR{'\t'}CODE
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => handlePickingImage1()}
          />
        </ImageBackground>
        <CustomInputField
          title="Your Message"
          placeholder={'Write Here...'}
          value={message}
          setValue={setMessage}
          isMultiple
        />
        <TouchableOpacity style={styles.buttonWrapper} onPress={saveIt}>
          <Text style={styles.buttonTag}>SAVE</Text>
        </TouchableOpacity>
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
    borderWidth: 10,
    borderRadius: 10,
    borderStyle: 'dashed',
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
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 15,
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

export default Invoice;
