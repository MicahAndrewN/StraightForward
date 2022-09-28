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
      <Text style={styles.title}>Hello user, {data}</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Customize',
            {
              screen: 'Contacts',
              params: {
              }
            })}
        >
          <Text>Add Contact Widget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


}

export default CustomizeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
