import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPin} from '../Features/PinSlice';

function Login({navigation}) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+92');
  const [otp, setOtp] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleChangePhoneNumber = text => {
    // Allow only digits and +
    if (/^\+92\d+$/.test(text)) {
      setPhoneNumber(text);
    } else if (text.length < 13) {
      setPhoneNumber(text.replace(/[^0-9+]/g, ''));
    }
  };

  const handleOtpChange = text => {
    setOtp(text);
  };

  const handleBusinessName = text => {
    setBusinessName(text);
  };

  const handleLogin = async () => {
    try {
      // Validation checks
      const digitsForBackend = phoneNumber.substring(3);
      // if (!digitsForBackend || otp.length !== 4 || businessName.length == 0) {
      if (!digitsForBackend || otp.length !== 4) {
        // Show an alert if either phone number or OTP is empty
        Alert.alert('Please Fill all the fields.');
        return;
      }

      console.log('Validating PIN...');
      const response = dispatch(
        sendPin({phoneNumber: digitsForBackend, pinCode: otp, Business_Name: businessName}),
      );

      console.log('Server Response:', response); // Log the entire server response

      // Check if the response indicates a successful login
      if (response.payload && response.payload['Message'] === 'Logged in Successfully!!') {
        console.log('Validation successful. Logging in...');
        navigation.replace('Home');
        // Optional: Show a success alert
        Alert.alert('Login Successful');
      } else {
        // Show an error alert for unsuccessful login
        console.error('Login failed:', response.payload);
        Alert.alert('Invalid PIN or phone number');
      }
    } catch (error) {
      // Log the entire error object for debugging
      console.error('Error validating PIN:', error);
      Alert.alert('Login failed. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 h-screen justify-around bg-[#6755A4]">
        <View>
          <Image
            source={require('../assets/logo2.png')}
            className="mt-10 mx-auto object-contain w-40 h-60"
          />

          {/* Phone Number and PIN Input */}
          <View className="p-5 mt-5 mx-5 backdrop-blur-sm">
            <View>
              {/* <TextInput
                className="border-[#3FC4E0] border-b-2 text-white py-2 text-lg  px-2 mb-4"
                onChangeText={handleBusinessName}
                value={businessName}
                placeholder="Business Name"
                placeholderTextColor={'white'}
              /> */}
              <TextInput
                className="border-[#3FC4E0] border-b-2 text-white py-2 text-lg  px-2 mb-4"
                onChangeText={handleChangePhoneNumber}
                keyboardType="numeric"
                maxLength={13}
                value={phoneNumber}
                placeholder="Phone Number (+92)"
                placeholderTextColor={'white'}
              />
              <TextInput
                className="border-[#3FC4E0] border-b-2 text-white py-2 text-lg px-2 mb-4"
                onChangeText={handleOtpChange}
                keyboardType="numeric"
                maxLength={4}
                value={otp}
                placeholder="Pin Code"
                placeholderTextColor={'white'}
              />
            </View>
            <TouchableOpacity
              className="bg-white py-2 px-4 rounded-md max-h-fit w-52 mx-auto"
              onPress={handleLogin}>
              <Text className="text-[#6755A4] text-xl text-center font-bold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Not a User */}
        <View className="p-4 mt-10">
          <Text className="text-[#3FC4E0] text-center text-xl mb-2">
            Not a user?
          </Text>
          <TouchableOpacity
            className="border-white border-2 rounded-md py-2 px-4 w-52 mx-auto"
            onPress={() => navigation.navigate('Demo')}>
            <Text className="text-white text-xl text-center font-bold">
              Book a demo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Login;
