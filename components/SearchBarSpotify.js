import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Text, Button, TouchableOpacity } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import SpotifyWebApi from "spotify-web-api-node";




const SearchBarSpotify = ({searchFunction}) => {

  const [text, onChangeText] = useState("");

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
            <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunction(text)}
          >
            <Ionicons 
                        name="search" 
                        style = {styles.icon}
                        size={40} 
                        color="#FFFFFF"/>
            
          </TouchableOpacity>
        </View>
    )


};

export default SearchBarSpotify;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      backgroundColor: "white",
    },
    input: {
      height: 65,
      margin: 10,
      width: 250,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 0,
    },
    icon: {
      marginHorizontal: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto'

  },
  
    button: {
      alignItems: 'center',
      backgroundColor: 'royalblue',
      margin: 10,
      height: 65,
      width: 65,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 24,
      marginTop: 15,
      color: '#FFFFFF',
    },
  });