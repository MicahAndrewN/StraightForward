import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Text, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import * as tokenAction from "../store/actions/token";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "../components/AuthContext";

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
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log("success!!!!!")
          console.log(response.json)
          console.log(auth)

          // dispatch(songAction.addTopSongs(response));
        })
        .catch((error) => {
          console.log("error", error.message);
        });

        auth.spotifyToken = token
      // should prob take them back to previous page here? 

    }
  });

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
        { auth.spotifyToken === '' ?
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
          onPress={() => console.log("make a playlist")}
        >
          <Text style={styles.buttonText}>Add Playlist Widget</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("make a playlist")}
        >
          <Text style={styles.buttonText}>Add Album Widget</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("make a playlist")}
        >
          <Text style={styles.buttonText}>Add Artist Widget</Text>
        </TouchableOpacity>


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
    justifyContent: "center",
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