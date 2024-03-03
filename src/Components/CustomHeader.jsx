import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Theme from '../Theme/Theme';

const CustomHeader = ({title = 'Demo Store', onPressBack}) => {
  const Insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: Insets.top + 56,
        width: '100%',
        backgroundColor: Theme.colors.primary,
        paddingBottom: 15,
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity activeOpacity={1} onPress={onPressBack}>
        <AntDesign name="arrowleft" color="white" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {title}
      </Text>
      <TouchableOpacity>
        <AntDesign name="arrowleft" color="transparent" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
