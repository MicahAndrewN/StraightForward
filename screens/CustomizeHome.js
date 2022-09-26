import { StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";


const CustomizeHome = ({navigation}) => {


  return (
    <View style={styles.container}>
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
