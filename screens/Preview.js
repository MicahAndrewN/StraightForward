import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Preview = () => {
  const [names, setNames] = useState([]);
  const [contactWidgets, setContactWidgets] = useState([]);
  const [musicWidgets, setMusicWidgets] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        console.log(vals)
        setNames(vals)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  console.log("names", names)

  let temp_contacts = []
  let temp_music = []
  for (let i = 0; i < names.length; i++) {

    if (names[i]['type'] == 'contacts'){
      temp_contacts.push(
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => console.log("Call")}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <FontAwesome name="phone" size={20} color="black" />
          <Text style={styles.buttonText}> Call {names[i]['name']}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    else if (names[i]['type'] == 'music'){
      temp_music.push(
        <TouchableOpacity
          style={styles.musicButton}
          onPress={() => console.log("Call")}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FontAwesome name="music" size={20} color="black" />
            <Text style={styles.buttonText}> Play {names[i]['name']}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/mapimage1.png')} />
      <View style={styles.sidebar}>
        {temp_contacts}
        {temp_music}
      </View>
    </View>
  );
}

export default Preview;

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
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#afdbc2',
    marginTop: 10,
    height: 65,
    width: 200,
    borderRadius: 10,
  },
  musicButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5b0cf',
    marginTop: 10,
    height: 65,
    width: 200,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold'
  },
});
