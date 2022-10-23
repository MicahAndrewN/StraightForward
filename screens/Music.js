import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";


const Contacts = ({navigation}) => {

    return (
        <View style={styles.container}>
          <TouchableOpacity
          style={styles.drive}
          onPress={() => console.log("Spotify")}
        >
          <Text style={styles.driveText}>Add a Spotify Playlist</Text>
        </TouchableOpacity>
        </View>
      );

}

export default Contacts;

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
    backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
    fontWeight: 'bold'
  },
  driveText: {
    fontSize: 24,
    marginTop: 15,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
});
