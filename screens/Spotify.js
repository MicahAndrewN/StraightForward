import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import {
    auth as SpotifyAuth,
    remote as SpotifyRemote,
    ApiScope,
    ApiConfig,
  } from "react-native-spotify-remote";



const Spotify = ({navigation}) => {

    const [session, setSession] = useState(null)

    const spotifyConfig = ApiConfig = {
        clientID: "e36f952ff0df46de96031217f169216a",
        redirectURL: "www.google.com", // change
        tokenRefreshURL: "SPOTIFY_TOKEN_REFRESH_URL",
        tokenSwapURL: "SPOTIFY_TOKEN_SWAP_URL",
        scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
      };

      async function logInUser(){
        try{
            const token = await SpotifyAuth.authorize(spotifyConfig);
            await SpotifyRemote.connect(token);
            setSession(SpotifyRemote.connect(token));
        }catch(err){
            console.error("Couldn't authorize with or connect to Spotify",err);
        }
    }

    return (
        <View style={styles.container}>
          <TouchableOpacity
          style={styles.drive}
          onPress={() => logInUser}
        >
          <Text style={styles.driveText}>Connect Your Spotify Account</Text>
        </TouchableOpacity>
        </View>
      );

}

export default Spotify;

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
