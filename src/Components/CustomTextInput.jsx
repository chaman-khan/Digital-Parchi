import React from 'react';
import {TextInput, Dimensions, StyleSheet, View, Text} from 'react-native';
import Theme from '../Theme/Theme';

const {width} = Dimensions.get('window');

const FontSize = 16;
const FieldHeight = 45;

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  prefix,
}) => {
  return (
    <View style={styles.wrapper}>
      {prefix && (
        <Text style={[styles.textInput, styles.prefix]}>{prefix}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={setValue}
        keyboardType={keyboardType}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    borderBottomWidth: 2,
    borderColor: Theme.colors.secondary,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    height: FieldHeight,
    paddingHorizontal: 10,
  },
  prefix: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: FieldHeight,
  },
  textInput: {
    color: 'white',
    fontSize: FontSize,
    fontWeight: 'normal',
    height: '100%',
    width: '100%',
    width: width * 0.9 - 20 - FieldHeight,
  },
});

export default CustomTextInput;
