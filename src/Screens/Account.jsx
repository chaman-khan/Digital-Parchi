import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import Theme from '../Theme/Theme';

const {width} = Dimensions.get('window');

const Fields = [
  {
    icon: 'info-with-circle',
    title: 'Customer info',
  },
  {
    icon: 'box',
    title: 'Inventory management',
    navigate: 'InventoryManagement',
  },
  {
    icon: 'circle-with-plus',
    title: 'Add new product',
    navigate: 'AddProduct',
  },
  {
    icon: 'text-document-inverted',
    title: 'Invoice management',
    navigate: 'Invoice',
  },
  {
    icon: 'user',
    title: 'Contact us',
  },
  {
    icon: 'log-out',
    title: 'Logout',
  },
];

const Account = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.fieldWrapper}
        onPress={() => {
          if (item.navigate) navigation.navigate(item.navigate);
          else return;
        }}>
        <View style={styles.fieldNameContainer}>
          <View style={styles.iconWrapper}>
            <Entypo name={item.icon} color="white" size={20} />
          </View>
          <Text style={styles.fieldTitle}>{item.title}</Text>
        </View>
        <Entypo name="chevron-right" color={Theme.colors.primary} size={22} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.hello}>Hello,</Text>
      <FlatList
        data={Fields}
        renderItem={renderItem}
        ItemSeparatorComponent={<View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  fieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 20,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  fieldNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
  },
  fieldTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
  },
});
export default Account;
