import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import Theme from '../Theme/Theme';

const CustomActivityIndicator = ({showActivity}) => {
  if (!showActivity) return;
  else if (showActivity)
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.mainContainer, styles.mask]} />
        <View style={styles.cardWrapper}>
          <ActivityIndicator size={'large'} color={Theme.colors.primary} />
          <View style={styles.textWrapper}>
            <Text style={styles.text1}>Processing...</Text>
            <Text style={styles.text2}>Please wait...</Text>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    backgroundColor: 'black',
    opacity: 0.4,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  textWrapper: {
    borderLeftWidth: 1,
    borderColor: Theme.colors.secondary,
    paddingLeft: 10,
    flex: 1,
    marginLeft: 10,
  },
  text1: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text2: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'normal',
  },
});

export default CustomActivityIndicator;
