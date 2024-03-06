import React, {useEffect} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {handleGetProfile} from '../Features/ParchiSlice';
import {useSnackbar} from '../Components/CustomSnackBar';
import Theme from '../Theme/Theme';

const CustomerInfo = ({navigation}) => {
  const {profile} = useSelector(state => state.app);
  const userId = useSelector(state => state.pin.userId);
  const {showSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = () => {
    console.log(userId);
    dispatch(handleGetProfile(userId, onSuccessGetData, onErrorGetData));
  };
  const onSuccessGetData = () => {
    showSnackbar('Success : Invoice data fetched', 'green');
  };

  const onErrorGetData = () => {
    showSnackbar('Error : Check Internet!', 'red');
  };
  console.log(profile.Profile.Logo);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        title={`Customer Info`}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.logo}>
        <Image
          source={{uri: profile.Profile.Logo}}
          style={{width: 160, height: 160, borderRadius: 25}}
        />
      </View>

      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.Profile.Name}</Text>
          <Image
            source={{uri: profile.Profile.QR}}
            style={{width: 70, height: 70}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '30%', gap: 10}}>
            <Text style={{color: Theme.colors.primary, fontWeight: '500'}}>
              EMail:
            </Text>
            <Text style={{color: Theme.colors.primary, fontWeight: '500'}}>
              Address:
            </Text>
            <Text style={{color: Theme.colors.primary, fontWeight: '500'}}>
              Phone NO:
            </Text>
            <Text style={{color: Theme.colors.primary, fontWeight: '500'}}>
              Invoice Message:
            </Text>
          </View>
          <View style={{width: '70%', gap: 10}}>
            <Text style={{color: 'grey'}}>{profile.Profile.Email}</Text>
            <Text style={{color: 'grey'}}>{profile.Profile.Address}</Text>
            <Text style={{color: 'grey'}}>{profile.Profile.Phone}</Text>
            <Text style={{color: 'grey'}}>
              {profile.Profile.InvoiceMessage}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 170,
    height: 170,
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    // borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  name: {
    color: Theme.colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.cairo_Regular,
  },
  info: {
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 40,
    margin: 10,
    padding: 20,
  },
});
export default CustomerInfo;
