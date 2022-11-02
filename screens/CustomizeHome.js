import { StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRefContext } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import React, { useState, useEffect } from "react";


const CustomizeHome = ({ navigation }) => {

  const [data, setdata] = useState();

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

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>StraightForward</Text> */}
      <Text style={styles.title2}>Welcome back, {data}!</Text>
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
      <View style={styles.driveButton}>
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
        <TouchableOpacity
          style={styles.drive}
          onPress={() => navigation.navigate('Customize',
          {
            screen: 'Navigation',
            params: {}
          })}
        >
          <Text style={styles.driveText}>Navigation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );


}

export default CustomizeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF"
  },
  button: {
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
    fontWeight: 'bold'
  },
  driveText: {
    fontSize: 24,
    marginTop: 15,
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
  drive: {
    alignItems: 'center',
    backgroundColor: '#4285F4',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
    fontWeight: 'bold'
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
