import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  BackHandler,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
const {width, height} = Dimensions.get('screen');

const EditScreen = ({navigation, route}) => {
  const {item} = route.params;
  console.log(item);

  const [select, setSelect] = useState(false);
  const [source, setSource] = useState(item.Image);
  const [Name, setName] = useState(item.Name);
  const [Unit_Price, setUnit_Price] = useState(item.Unit_Price);
  const [Description, setDescription] = useState(item.Description);

  const isLandscape = () => {
    // Detect landscape mode
    const {width, height} = Dimensions.get('window');
    return width > height;
  };

  const gallery = () => {
    ImagePicker.openPicker({}).then(images => {
      console.log(images);
      setSource(images.path);
      setSelect(true);
    });
  };
  console.log(Unit_Price);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Edit your Product
        </Text>
        <BackIcon name="arrow-back" size={25} color={'transparent'} />
      </View>

      <ScrollView>
        <View className="px-4">
          <TouchableOpacity
            activeOpacity={1}
            onPress={gallery}
            className="border-b w-full py-3 items-center border-b-gray-300">
            <Image
              source={
                select
                  ? {uri: `file://${source}`}
                  : {uri: `data:image/jpeg;base64,${source}`}
              }
              style={
                isLandscape()
                  ? {width: 300, height: 300}
                  : {width: 200, height: 300}
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <TextInput
              className="font-bold text-xl text-black py-2"
              value={Name}
              onChangeText={txt => setName(txt)}
              multiline
            />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text className="font-extrabold py-1 pb-5 text-lg text-[#6755A4]">
                Rs.
              </Text>
              <TextInput
                value={Unit_Price}
                onChangeText={txt => setUnit_Price(txt)}
                className="font-extrabold py-1 pb-5 text-lg text-[#6755A4]"
                style={{width: '80%'}}
              />
            </View>
            <TextInput
              className="text-lg"
              value={Description}
              onChangeText={txt => setDescription(txt)}
              multiline
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.updateButton}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Update
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#6755A4',
  },
  updateButton: {
    width: 130,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6755A4',
    borderRadius: 20,
    marginBottom: 20,
  },
  modal: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: height / 3,
  },
  done: {
    color: '#6755A4',
    fontSize: 20,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
});

export default EditScreen;
