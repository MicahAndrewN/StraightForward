import { StyleSheet, Spinner } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, Button, Alert } from "../components/Themed";

export default function Preview() {
  let names = [];
  fetch('http://127.0.0.1:5000/getwidgets').then((response) => response.json()).then((json) => {
    for (var i in json)
      names.push(json[i].name)
  })
  console.log(names)

  let buttons = []
  for (let i = 0; i < names.length; i++) {
    buttons.push(<Button
      title={names[i]}
      onPress={() => Alert.alert('No widget action assigned')}
    />)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"/>

      {buttons}
      
    </View>
  );
}

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
});
