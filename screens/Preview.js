import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Preview = () => {
  const getNamesToCall = () => {
    let names = [];
    //Returns a list of names to make call buttons for
    fetch('http://127.0.0.1:5000/getwidgets').then((response) => response.json()).then((json) => {
      for (var i in json)
        names.push(json[i].name)
    })
    console.log(names)
    return names
  }

  const names = getNamesToCall()

  const render = ({ item }) => {
    return(
      <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Call")}
        >
        <Text style={styles.buttonText}><FontAwesome name="phone" size={20} color="black" /> Call {item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/mapimage1.png')} />
      <View style={styles.sidebar}>
        <FlatList
          horizontal={true}
          data={names}
          renderItem={render}
          keyExtractor={(item, index) => index.toString()}
        />
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
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    height: 65,
    width: 150,
    alignSelf: 'center',
    transform: [{ rotate: '-90deg' }],
  },
  buttonText: {
    fontWeight: 'bold'
  },
});
