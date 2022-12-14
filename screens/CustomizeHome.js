import { StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRefContext } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import React, { useState, useEffect, useContext } from "react";
import { ColorMode } from "../navigation/index"
import AuthContext from "../components/AuthContext";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const CustomizeHome = ({ navigation }) => {

  const [data, setdata] = useState();
  const [colorMode, setColorMode] = useContext(ColorMode);
  const [atWidgetLimit, setAtWidgetLimit] = useState(false);
  const auth = useContext(AuthContext)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/getname", {mode: 'no-cors'}).then((response) => response.json())
      .then((json) => {
        setdata(json.name)
      }).catch((error) => {
        console.error(error);
        setdata("error parsing json ")
      })
      .catch((error) => {
        console.error(error);
        setdata("error with connecting to api ")
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/getwidgets", {mode: 'no-cors'}).then((response) => response.json())
      .then((json) => {
        if (json && Object.entries(json).length >= 5){
          setAtWidgetLimit(true);
        }
        else{
          setAtWidgetLimit(false);
        }
      }).catch((error) => {
        console.error(error);
        setAtWidgetLimit(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorMode === "dark" ? "#000000" : "#FFFFFF"
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorMode === "dark" ? "#3d3d3d" : "#ebebeb",
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 300,
      borderRadius: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    driveText: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold'
    },
    driveButton: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    manageButton: {
      width: 200, 
      justifyContent: 'space-around',
      backgroundColor: '#ffb5b5',
      alignSelf: 'center', 
      textAlign: 'center',
      height: 50, 
      marginBottom: 20, 
      borderRadius: 10,

    },
    manageText: {
      alignSelf: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    drive: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5271FF',
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 300,
      borderRadius: 30,
      fontWeight: 'bold'
    },
    title2: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      color: colorMode === "dark" ? "#FFFFFF" : "#000"
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });

  console.log("auth:", auth)

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>StraightForward</Text> */}
      <Text style={styles.title2}>Welcome back, {data}!</Text>

      {
        atWidgetLimit ? 
        <>
          <Text>You've hit the safe driving maximum of five widgets. </Text>
          <Text>Head to "Manage Widgets" to make room for new ones!</Text>
          <Text>Or, if you're all set, preview your driving interface and hit the road.</Text>
        </>
        :
        <>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customize',
          {
            screen: 'MakeCalls',
            params: {}
          })}
      >
        <Text style={styles.text}>Add Contacts Widget</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customize',
        {
          screen: 'Media',
          params: {}
        })
      }
      >
        <Text style={styles.text}>Add Media Widget</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customize',
        {
          screen: 'Navigation',
          params: {}
        })
      }
      >
        <Text style={styles.text}>Add Map Widget</Text>
      </TouchableOpacity>
      </>
      }
      
      <View style={styles.driveButton}>
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('Customize',
            {
              screen: 'ManageWidgets',
              params: {}
            })
          }
        >
          <Text style={styles.manageText}>Manage Widgets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drive}
          onPress={() => navigation.navigate('Customize',
          {
            screen: 'Drive',
            params: {}
          })}
        >
          <Text style={styles.driveText}>Drive</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CustomizeHome;

