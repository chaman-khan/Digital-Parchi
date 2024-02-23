import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RightIcon from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import InfoIcon from 'react-native-vector-icons/Entypo';
import InventoryIcon from 'react-native-vector-icons/MaterialIcons';
import AddIcon from 'react-native-vector-icons/Ionicons';
import InvoiceIcon from 'react-native-vector-icons/FontAwesome5';

const Account = ({navigation}) => {
  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <Text style={styles.hello}>Hello,</Text>
      <TouchableOpacity activeOpacity={1} style={styles.item}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            <InfoIcon name="info-with-circle" color="white" size={20} />
          </View>
          <Text style={styles.text}>Customer Info</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => navigation.navigate('InventoryManagement')}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            {/* <UserIcon name="user" color="white" size={30} /> */}
            <InventoryIcon name="inventory" color="white" size={20} />
          </View>
          <Text style={styles.text}>Inventory Management</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => navigation.navigate('AddProduct')}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            <AddIcon name="add-circle" color="white" size={20} />
          </View>
          <Text style={styles.text}>Add New Product</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.item}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            <InvoiceIcon name="file-invoice" color="white" size={20} />
          </View>
          <Text style={styles.text}>Invoice Management</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.item}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            <UserIcon name="user" color="white" size={20} />
          </View>
          <Text style={styles.text}>Contact Us</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.item}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={styles.icon}>
            <LogoutIcon name="logout" color="white" size={20} />
          </View>
          <Text style={styles.text}>Logout</Text>
        </View>
        <RightIcon name="right" color="black" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#6755A4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {fontSize: 19, color: 'black'},
  hello: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default Account;
