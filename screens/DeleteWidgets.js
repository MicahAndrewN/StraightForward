import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { ColorMode } from "../navigation/index"
import { FontAwesome } from '@expo/vector-icons';

const DeleteWidgets = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [colorMode, setColorMode] = useContext(ColorMode);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        setWidgets(vals)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorMode === "dark" ? "#000" : "#FFFFFF",
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDD',
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 250,
      borderRadius: 20,
    },
    submit: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4285F4',
      height: 65,
      width: 200,
      borderRadius: 20,
    },
    reset: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      height: 65,
      width: 75,
      marginRight: 5,
      borderRadius: 20,
    },
    text: {
      fontSize: 20,
      color: colorMode === "dark" ? "#FFFFFF" : "#000",
      fontWeight: 'bold'
    },
    buttonText: {
      margin: 10,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    submitText: {
      fontSize: 24,
      color: "#FFF",
      fontWeight: 'bold'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorMode === "dark" ? "#FFFFFF" : "#000"
    },
  });

  const remove = (item) => {
    if (selected.indexOf(item) === -1) {
      setSelected(test => ([...test, item]));
    }
    else {
      setSelected(test => ([...test.slice(0, test.indexOf(item)), ...test.slice(test.indexOf(item) + 1)]));
    }
  }
  const render = ({ item }) => {
    var widgetType = ''
    var displayText = ''
    if (item['type'] == 'contacts') {
      widgetType = 'phone'
      displayText = 'Call'
    }
    else if (item['type'] == 'navigation') {
      widgetType = 'map'
      displayText = 'Map to'
    }
    else {
      widgetType = 'music'
      displayText = 'Play'
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => remove(item)}
      >
        {selected.indexOf(item) !== -1 ? // if
          <Text 
            style={styles.buttonText}
            numberOfLines={3}
            adjustsFontSizeToFit={true}
          >
            <FontAwesome name={widgetType} size={20} color="black" /> {displayText} {item['name']} &#10060;
          </Text> 
          : // else
          <Text 
            style={styles.buttonText}
            numberOfLines={3}
            adjustsFontSizeToFit={true}
          >
            <FontAwesome name={widgetType} size={20} color="black" /> {displayText} {item['name']}
          </Text>
        }
      </TouchableOpacity>
    )
  }
  const handleWidgets = () => {
    selected.forEach(function (widget) {
      var json = ''
      if (widget['type'] == 'contacts') {
        json = JSON.stringify({
          "type": widget['type'],
          "subtype": widget['subtype'],
          "name": widget['name'],
          "phonenumber": "4406267220"
        })
      }
      else if (widget['type' == 'navigation']) {
        json = JSON.stringify({
          "type": widget['type'],
          "name": widget['name']
        })
      }
      else {
        json = JSON.stringify({
          "name": widget['name'],
          "playlistID": widget['playlistID'],
          "subtype": widget['subtype'],
          "type": widget['type'],
          "url": widget['url']
        })
      }
      console.log(widget)
      fetch('http://127.0.0.1:5000/deletewidget', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: json,
        mode: 'no-cors'
      }).then(() => {
        navigation.navigate('Customize',
          {
            screen: 'CustomizeHome',
            params: {}
          })
      }).catch((error) => {
        console.error(error);
        setdata("error with connecting to api")
      });
      return
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delete Widgets</Text>
      <Text style={styles.text}>Select widgets to delete:</Text>
      <FlatList
        data={widgets}
        renderItem={render}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        {selected.length != 0 &&
                <TouchableOpacity
                style={styles.reset}
                onPress={() => setSelected([])}
              >
                <Text style={{fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>Clear Selections</Text>
              </TouchableOpacity>
        
        }

        <TouchableOpacity
          style={styles.submit}
          onPress={() => handleWidgets(selected)}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default DeleteWidgets;