import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';

const Navigation = ({ navigation }) => {
  const [selected, setSelected] = useState({});
  const [potentialWidgets, setPotentialWidgets] = useState(5);
  const [theArray, setTheArray] = useState(["Bob and Betty Beyster Building (BBB)", "Burton Memorial Tower", "University of Michigan School of Nursing"]);

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
    if (checkWidgetLimit()){
      Object.keys(selected).forEach(function (key, index) {
        console.log(selected)
        if (selected[key]) {
          fetch('http://127.0.0.1:5000/addwidget', {
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
  }

  // functions for checking widget limit
  useEffect(() => {
    fetch("http://127.0.0.1:5000/getwidgets", {mode: 'no-cors'}).then((response) => response.json())
      .then((json) => {
        if (json && Object.entries(json).length > 0){
          let nonNavWidgets = 0;
          for (let i = 0; i < Object.entries(json).length; ++i){
            console.log(Object.entries(json)[i][1])
            if (Object.entries(json)[i][1]['type'] != 'navigation'){
              nonNavWidgets += 1
            }
          }
          setPotentialWidgets(5 - nonNavWidgets);
        }
        else{
          setPotentialWidgets(5);
        }
      }).catch((error) => {
        console.error(error);
        setPotentialWidgets(5);
      })
      .catch((error) => {
        console.error(error);
      });
  }, );

  function checkWidgetLimit(){
    let selectedCount = 0;
    for (let i = 0; i < Object.entries(selected).length; ++i){
      if (Object.entries(selected)[i][1] === true){
        selectedCount += 1;
      }
    }
    if (selectedCount > 5){
      Alert.alert("Too many widgets selected. You've selected " + Object.entries(selected).length + " widgets, while already having " + (5 - potentialWidgets) + " widgets, and StraightForward has a limit of 5 widgets. Please try again, or head to the 'Manage Widgets' page to deselect media or contacts widgets.")
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, }}>Navigate To</Text>
      <FlatList
        data={theArray}
        renderItem={render}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Destination"
        keyboardType="default"
        onSubmitEditing={(value) => setTheArray([...theArray, value.nativeEvent.text])}
      />
      <TouchableOpacity
        style={styles.button2}
        onPress={() => handleWidgets(selected)}
      >
      <Text style={{ fontWeight: 'bold', marginTop: 15, fontSize: 20, color: '#ffffff' }}>Submit</Text>
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
    backgroundColor: "#ebebeb",
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 300,
    borderRadius: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#5271FF',
    marginTop: 10,
    color: 'ffffff',
    textAlign: 'center',
    marginBottom: 10,
    height: 65,
    width: 300,
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',

  },
  input: {
    alignItems: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  }
});

export default Navigation;