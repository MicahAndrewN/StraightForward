import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AuthContext from '../components/AuthContext';
import { ColorMode } from "../navigation";


const MakeCalls = ({ navigation }) => {
  const [selected, setSelected] = useState({});
  const [nonContacts, setNonContacts] = useState(0);

  const [colorMode, setColorMode] = useContext(ColorMode);
  const [potentialWidgets, setPotentialWidgets] = useState(5);
  const data = [
    "Mom", "Dad", "Daniel", "1", "2", "3", "4","5","6","7","8","9","10"
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        vals.forEach(function (v) {
          setSelected(test => ({ ...test, [v.name]: true }));
        })
        }).catch((error) => console.log("error1 " + error))
  }, []);

  const check = (item) => {
    console.log(selected)
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
        console.log("selected key is", selected[key])
        if (selected[key]) {
          fetch('http://127.0.0.1:5000/addwidget', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "type": "contacts",
              "subtype": "call",
              "name": key,
              "phonenumber": "4406267220"
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorMode === "dark" ? "#000" : "#FFFFFF",
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: colorMode === "dark" ? "#3d3d3d" : "#ebebeb",
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 300,
      borderRadius: 10,
    },
    submitButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5271FF',
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 300,
      borderRadius: 30,
    },
    text: {
      fontSize: 24,
      marginTop: 18,
      color: colorMode === "dark" ? "#FFFFFF" : "#000"
    },
    submitText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: "#FFFFFF"
    },
    title: {
      fontSize: 24,
      marginTop: 20,
      fontWeight: 'bold',
      color: colorMode === "dark" ? "#FFFFFF" : "#000"
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/getwidgets", {mode: 'no-cors'}).then((response) => response.json())
      .then((json) => {
        if (json && Object.entries(json).length > 0){
          let nonContactsWidgets = 0;
          for (let i = 0; i < Object.entries(json).length; ++i){
            console.log(Object.entries(json)[i][1])
            if (Object.entries(json)[i][1]['type'] != 'contacts'){
              nonContactsWidgets += 1
            }
          }
          setPotentialWidgets(5 - nonContactsWidgets);
          setNonContacts(nonContactsWidgets)
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
      Alert.alert("Too many widgets selected. You've selected " + (selectedCount - nonContacts) + " widgets (while already having " + nonContacts + " widgets in other categories) and StraightForward has a limit of 5 widgets. Please try again, or head to the 'Manage Widgets' page to deselect media or contacts widgets.")
      return false;
    }
    return true;
  }

  console.log("potential widgets to add on this screen: ", potentialWidgets)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Make Calls</Text>
      <FlatList
        data={data}
        renderItem={render}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleWidgets(selected)}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default MakeCalls;