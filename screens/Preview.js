import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ColorMode, WidgetLayout } from "../navigation";

const Preview = () => {
  const [names, setNames] = useState([]);
  const [contactWidgets, setContactWidgets] = useState([]);
  const [musicWidgets, setMusicWidgets] = useState([]);
  const [colorMode, setColorMode] = useContext(ColorMode);
  const [widgetLayout, setWidgetLayout] = useContext(WidgetLayout);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        console.log(vals)
        setNames(vals)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  const flex = {"top": "row-reverse", "bottom": "row", "left": "column", "right": "column-reverse"};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: flex[widgetLayout],
      width: '100%',
      height: '100%',
      backgroundColor: colorMode === "dark" ? "#000" : "#FFFFFF",
      alignSelf: 'center',
      alignItems: 'center',
      margin: 10,
    },
    image: {
      flex: 3,
      resizeMode: 'cover',
      height: '100%',
      width: "100%"
    },
    sidebar: {
      flex: 1,
      flexDirection: widgetLayout === "left" || widgetLayout === "right" ? "column" : "row",
      alignItems: widgetLayout === "left" || widgetLayout === "right" ? "" : "flex-end"
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDD',
      height: widgetLayout === "left" || widgetLayout === "right" ? 80 : 90,
      width: widgetLayout === "left" || widgetLayout === "right" ? 200 : 100,
      margin: widgetLayout === "left" || widgetLayout === "right" ? -55 : 10,
      alignSelf: 'center',
      transform: [{ rotate: '-90deg' }],
      borderRadius: 20
    },
    buttonText: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
  });

  const render = ({ item }) => {
    var widgetType = item['type'] == 'contacts' ? 'phone' : 'music';
    var text = item['type'] == 'contacts' ? 'Call' : 'Play';

    return(
      <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Call")}
        >
        <Text 
          style={styles.buttonText}
          numberOfLines={2}
          adjustsFontSizeToFit={true}
        >
          <FontAwesome name={widgetType} size={20} color="black" /> {text} {item['name']}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/mapimage2.png')} />
      <View style={styles.sidebar}>
        <FlatList
          horizontal={widgetLayout === "left" || widgetLayout === "right" ? true : false}
          data={names}
          renderItem={render}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default Preview;
