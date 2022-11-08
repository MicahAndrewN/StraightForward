import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ColorMode } from "../navigation";

const Media = ({navigation}) => {
    const [colorMode, setColorMode] = useContext(ColorMode)

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: [colorMode === "dark" ? "#000" : "#FFF"],
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
      text: {
        fontSize: 20,
        textAlign: 'center',
        color: [colorMode === "dark" ? "#FFFFFF" : "#000"],
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
      menu: {
        marginTop: 30,
        backgroundColor: [colorMode === "dark" ? "#000" : "#FFF"],
      },
      driveText: {
        fontSize: 24,
        marginTop: 15,
        color: '#FFFFFF',
        fontWeight: 'bold'
      },
    });

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Click on each menu below to link StraightForward to your existing accounts and save media to play on your drive!</Text>
          <View style={styles.menu}>
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
        </View>
      );

}

export default Media;
