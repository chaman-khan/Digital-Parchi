import React, {createContext, useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Animated, StatusBar} from 'react-native';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('red');
  const [translateY] = useState(new Animated.Value(-100)); // Initial position off-screen

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0, // Animate to top of the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -100, // Animate back off-screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY]);

  const showSnackbar = (msg, bg = 'red') => {
    setMessage(msg);
    setBgColor(bg);
    setIsVisible(true);
    setTimeout(() => hideSnackbar(), 4000);
  };

  const hideSnackbar = () => setIsVisible(false);

  const value = {
    isVisible,
    message,
    showSnackbar,
    hideSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: bgColor,
          transform: [{translateY}],
          paddingTop: StatusBar.currentHeight,
        }}>
        {isVisible && (
          <Text style={{color: '#fff', textAlign: 'left', padding: 15}}>
            {message}
          </Text>
        )}
      </Animated.View>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
