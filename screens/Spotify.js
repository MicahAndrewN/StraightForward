import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Text, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import ItemSelector from "../components/ItemSelector"
import * as tokenAction from "../store/actions/token";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "../components/AuthContext";
import SpotifyWebApi from "spotify-web-api-node";
import { acc } from "react-native-reanimated";


const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const Spotify = ({ navigation }) => {
  // const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const redirectUri = makeRedirectUri();
  console.log(redirectUri);
  const auth = useContext(AuthContext)

  const spotifyApi = new SpotifyWebApi();
  const [playlists, setPlaylists] = useState([])
  const [display, setDisplay] = useState("All")


  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "e36f952ff0df46de96031217f169216a",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      const { refresh_token } = response.params;
      setToken(access_token);
      auth.spotifyToken = access_token
      try{
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token)
      }
      catch(error){
        console.log("could not set access token", error)
      }
    }
  }, [response]);

  spotifyApi.setAccessToken(token)
  console.log(spotifyApi.getAccessToken)

  console.log(auth.spotifyToken)

  // automatically do login stuff 
  // if theyre not logged in THEN go to login page

  function addPlaylistWidgets(newWidgets){
    for (let i = 0; i < newWidgets.length; ++i){
      fetch('http://127.0.0.1:5000/addwidget', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "type": "music",
          "subtype": "playlist",
          "name": newWidgets[i]['name'],
          "url": newWidgets[i]['url']
        })
      }).then(() => {
        console.log("widget added")
      }).catch((error) => {
        console.error(error);
        setdata("error with connecting to api")
      });
    }
    setDisplay("All")

    
  }
  console.log(display)


  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            marginBottom: "20%",
          }}
        >
        </Text>
        { auth.spotifyToken === "" || auth.spotifyToken === undefined ?
        // user is not logged into spotify:
          <Button
          title="Login with Spotify"
          style={styles.button}
          onPress={() => {
            promptAsync();
          }}
        />
          : 
          // user is logged into spotify: 
          <View>

          <TouchableOpacity
          style={styles.button}
          onPress={() =>
              spotifyApi.getUserPlaylists('elizabethloeher')
              .then(function(data) {
                setDisplay("Playlists")
                console.log('Retrieved playlists', data.body);
                let playlist_data = [];
                data.body.items.map((playlist) => {
                  let item = {};
                  item['name'] = playlist['name']
                  item['url'] = playlist['external_urls']['spotify'];
                  playlist_data.push(item)
                });
                console.log(playlist_data)
                setPlaylists(playlist_data)

              },function(err) {
                console.log('Something went wrong!', err);
                Alert.alert("You may need to reconnect your Spotify account.");
                auth.spotifyToken = "";
              })
            }
        >

        { (display == "Playlists" || display == "All") && 
        <Text style={styles.buttonText}>Add Playlist Widget</Text>
        }



        </TouchableOpacity>
        {
          playlists.length != 0 && display == "Playlists" && 
          <>
            <ItemSelector items={playlists} addWidgets={addPlaylistWidgets}/>
          </>
        }

        { (display == "Album" || display == "All") && 
        <>
            <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("add album")}
          >
            <Text style={styles.buttonText}>Add Album Widget</Text>
          </TouchableOpacity>
          </>
        }
        { (display == "Artist" || display == "All") && 
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("add artist")}
          >
            <Text style={styles.buttonText}>Add Artist Widget</Text>
          </TouchableOpacity>
          </>
        }



        </View>

        }

        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
  );
};

export default Spotify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },

  button: {
    width: 200,
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1DB954',
    margin: 10,
    height: 65,
    width: 350,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 24,
    marginTop: 15,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
});