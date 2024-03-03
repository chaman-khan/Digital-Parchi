import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../Theme/Theme';

const {width} = Dimensions.get('window');

function Search({value, setValue}) {
  return (
    <View style={styles.wrapper}>
      <FontAwesome name="search" color={Theme.colors.primary} size={20} />
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        placeholderTextColor={'black'}
        cursorColor={Theme.colors.primary}
        style={styles.inputField}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 20,
    height: 55,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  inputField: {
    flex: 1,
    marginLeft: 15,
    color: 'black',
    fontSize: 16,
  },
});

export {Search};
