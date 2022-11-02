import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";


const Media = ({navigation}) => {

    return (
        <View style={styles.container}>
          <TouchableOpacity
          style={styles.drive}
          onPress={() => navigation.navigate('Customize', {
            screen: 'Spotify',
            params: {}
          })}
        >
          <Text style={styles.driveText}>Add a Spotify Widget</Text>
        </TouchableOpacity>
        </View>
      );

}

export default Media;

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
  drive: {
    alignItems: 'center',
    backgroundColor: '#1DB954',
    margin: 10,
    height: 65,
    width: 350,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  driveText: {
    fontSize: 24,
    marginTop: 15,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
});
