import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// npm i react-native-phone-call --legacy-peer-deps

const Drive = ({ navigation }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:5000/getwidgets')
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        var tempNames = new Array()
        vals.forEach(function (v) {
          tempNames.push(v.name)
        })
        console.log(tempNames)
        setNames(tempNames)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  let contactWidgets = []
  for (let i = 0; i < names.length; i++) {
    contactWidgets.push(
      <TouchableOpacity
        style={styles.button}
        onPress={callNumber("2485742275")}
      >
        <Text style={styles.buttonText}><FontAwesome name="phone" size={20} color="black" /> Call {names[i]}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/mapimage1.png')} />
      <View style={styles.sidebar}>
        {contactWidgets}
      </View>
    </View>
  );
}

export default Drive;

export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 336,
    height: '100%',
    backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 3,
    resizeMode: 'cover',
    width: "100%"
  },
  sidebar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    transform: [{ rotate: '-90deg' }],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    marginTop: 10,
    height: 65,
    width: 110,
  },
  buttonText: {
    fontWeight: 'bold'
  },
});