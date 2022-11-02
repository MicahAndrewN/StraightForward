import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';


const Navigation = ({ navigation }) => {
  const [selected, setSelected] = useState({});
  const data = [
    "Home", "School", "Work"
  ];

  const check = (item) => {
    setSelected(test => (test[item] ? { ...test, [item]: false } : { ...test, [item]: true }));
  }
  const render = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => check(item)}
      >
        {selected[item] ? <Text style={styles.text}>{item} &#10003;</Text> : <Text style={styles.text}>{item}</Text>}
      </TouchableOpacity>
    )
  }
  const handleWidgets = () => {
    Object.keys(selected).forEach(function (key, index) {
      if (selected[key]) {
        fetch('http://10.0.2.2:5000/addwidget', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "type": "navigation",
            "name": key
          }), 
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
      }
      return
    });
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Navigate To</Text>
      <FlatList
        data={data}
        renderItem={render}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button2}
        onPress={() => handleWidgets(selected)}
      >
        <Text style={{ fontWeight: 'bold', marginTop: 15, fontSize: 20 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 15,
  },
});

export default Navigation;