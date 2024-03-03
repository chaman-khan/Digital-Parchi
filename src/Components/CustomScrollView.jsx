import React, {useState, useEffect} from 'react';
import {ScrollView, Keyboard, View} from 'react-native';

const CustomScrollView = props => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView
      {...props}
      contentContainerStyle={{paddingBottom: keyboardHeight + 50}}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default CustomScrollView;
