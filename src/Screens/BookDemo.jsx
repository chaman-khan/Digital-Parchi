import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import {verticalScale} from '../Theme/Dimensions';
import Theme from '../Theme/Theme';
import CustomTextInput from '../Components/CustomTextInput';
import CustomScrollView from '../Components/CustomScrollView';
import {useSnackbar} from '../Components/CustomSnackBar';

const {width, height} = Dimensions.get('window');

function BookDemo({navigation}) {
  const {showSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleChangePhoneNumber = text => {
    if (text.length < 11) {
      setPhoneNumber(text.replace(/[^0-9+]/g, ''));
    }
  };

  const bookdemo = () => {
    showSnackbar('Success...', 'green');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        keyboardShouldPersistTaps="always">
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <CustomTextInput
          value={name}
          setValue={setName}
          keyboardType={'default'}
          placeholder={'Full Name'}
        />
        <CustomTextInput
          value={phoneNumber}
          setValue={handleChangePhoneNumber}
          keyboardType={'numeric'}
          placeholder={'XXXXXXXXXX'}
          prefix={'+92'}
        />
        <CustomTextInput
          value={address}
          setValue={setAddress}
          keyboardType={'default'}
          placeholder={'Address'}
        />
        <TouchableOpacity style={styles.loginButton} onPress={bookdemo}>
          <Text style={styles.buttonTag}>Book Now</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTag}>Already a user?</Text>
          <TouchableOpacity
            style={[styles.loginButton, styles.bottomButton]}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.buttonTag, styles.bottomButtonTag]}>
              GO BACK
            </Text>
          </TouchableOpacity>
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  logo: {
    width: width,
    height: height / 3,
    resizeMode: 'contain',
    marginVertical: verticalScale(50),
  },
  textInput: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    color: 'white',
    height: 55,
    marginVertical: 5,
    fontSize: 16,
  },
  loginButton: {
    width: '60%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(60),
  },
  buttonTag: {
    color: Theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginTop: verticalScale(100),
  },
  bottomTag: {
    color: Theme.colors.secondary,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 5,
    marginBottom: 20,
  },
  bottomButtonTag: {
    color: 'white',
    fontSize: 16,
  },
});

export default BookDemo;
