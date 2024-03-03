import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {StyleSheet, Text} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from '../../Screens/Home';
import Dashboard from '../../Screens/Dashboard';
import Cart from '../../Screens/Cart';
import Bluetooth from '../../Screens/Bluetooth';
import Account from '../../Screens/Account';
import Theme from '../../Theme/Theme';

const HomeTab = () => {
  const Tab = createBottomTabNavigator();
  const {cartItems} = useSelector(state => state.NawanSlice);

  const CustomHeaderTitle = () => (
    <Text style={styles.titleStyle}>Demo Store</Text>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {fontSize: 14},
        tabBarStyle: styles.tabBarStyle,
        headerStyle: {backgroundColor: Theme.colors.primary},
        headerTitle: CustomHeaderTitle,
        headerTitleAlign: 'center',
        style: {
          backgroundColor: 'red',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" size={size + 5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
          tabBarBadge:
            Object.keys(cartItems).length === 0
              ? ''
              : Object.keys(cartItems).length,
          tabBarBadgeStyle: {
            color: 'white',
            backgroundColor:
              Object.keys(cartItems).length === 0
                ? 'transparent'
                : Theme.colors.primary,
          },
        }}
      />
      <Tab.Screen
        name="Bluetooth"
        component={Bluetooth}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="bluetooth" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBarStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export default HomeTab;
