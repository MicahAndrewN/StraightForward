import { StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRefContext } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import React, { useState, useEffect } from "react";


const CustomizeHome = ({ navigation }) => {

  const [data, setdata] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/handler1").then((response) => response.json())
      .then((json) => {
        setdata(json.apiuser)
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
    <View style={styles.container}>
      <Text style={styles.title}>StraightForward</Text>
      <Text style={styles.title}>Hello user, {data}</Text>
        <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.navigate('Customize',
          {
            screen: 'AllowCalls',
            params: {}
          })}
        >
         <Text style={styles.text}>Add Contacts Widget</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.button}
         onPress={() => console.log("add music")}
        >
         <Text style={styles.text}>Add Music Widget</Text>
        </TouchableOpacity>
        <View style={styles.driveButton}>
          <TouchableOpacity
           style={styles.drive}
           onPress={() => console.log("Drive")}
          >
           <Text style={styles.driveText}>Drive</Text>
          </TouchableOpacity>
        </View>
    </View>
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
    textAlign: 'center',
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
  driveText: {
    fontSize: 24,
    marginTop: 15,
    color: '#FFFFFF',
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
    textAlign: 'center',
    backgroundColor: '#4285F4',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
