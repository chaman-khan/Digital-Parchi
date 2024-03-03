import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

import Theme from '../Theme/Theme';

// const data = [
//   {label: 'Today', value: 'today'},
//   {label: 'Weekly', value: 'last7Days'},
//   {label: 'Monthly', value: 'last30Days'},
// ];

const {width, height} = Dimensions.get('window');

const DropdownComponent = ({
  onDropdownChange,
  data,
  value,
  placeholder,
  isRow,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <Text
        style={{
          color: Theme.colors.primary,
          fontSize: 14,
          fontWeight: '500',
          position: 'absolute',
          marginLeft: 10,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          top: -10,
          zIndex: 1,
        }}>
        {placeholder}
      </Text>
      <SelectDropdown
        data={data}
        defaultButtonText={placeholder}
        onSelect={onDropdownChange}
        dropdownOverlayColor="transparent"
        statusBarTranslucent={true}
        buttonStyle={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Theme.colors.primary,
          backgroundColor: 'white',
          height: 55,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          width: isRow ? width / 2 - 15 : width - 20,
        }}
        buttonTextStyle={{
          fontSize: 16,
          color: value === '' ? Theme.colors.background : 'black',
          paddingLeft: 0,
          textAlign: 'left',
        }}
        dropdownStyle={{
          backgroundColor: 'white',
        }}
        rowTextStyle={{
          textAlign: 'left',
          paddingHorizontal: 10,
          fontSize: 14,
          color: 'grey',
        }}
        renderDropdownIcon={() => (
          <Entypo name="chevron-down" color={Theme.colors.primary} size={22} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    width: '80%',
    alignSelf: 'flex-end',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'red',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  itemText: {
    color: 'black',
  },
});

export default DropdownComponent;
