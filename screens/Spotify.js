import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Text, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import ItemSelector from "../components/ItemSelector"
import SearchBarSpotify from "../components/SearchBarSpotify"
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
  const [searchResults, setSearchResults] = useState([])
  const [display, setDisplay] = useState("All")
  const [potentialWidgets, setPotentialWidgets] = useState(5);



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

  // search functions
  function searchAlbumName(query){
    spotifyApi.searchAlbums(query)
    .then(function(data) {
      console.log('Retrieved albums', data.body);
      let album_data = [];
      let id = 0;
      data.body.albums.items.map((album) => {
        console.log(album)
        let item = {};
        item['id'] = id
        item['name'] = album['name'] + ' - ' + album['artists'][0]['name']
        item['artist'] = album['artists'][0]['name']
        item['url'] = album['uri'];
        item['albumName'] = album['name'];
        item['albumID'] = album['id'];
        album_data.push(item)
        id += 1
      });
      console.log(album_data)
      setSearchResults(album_data)

    },function(err) {
      promptAsync();
      auth.spotifyToken = "";
    })
  }

  function searchArtistName(query){
    spotifyApi.searchArtists(query)
    .then(function(data) {
      console.log('Retrieved artist data', data.body);
      let artist_data = [];
      let id = 0;
      data.body.artists.items.map((artist) => {
        console.log(artist)
        let item = {};
        item['id'] = id
        item['name'] = artist['name']
        item['url'] = artist['uri'];
        item['artistID'] = artist['id']
        artist_data.push(item)
        id += 1
      });
      console.log(artist_data)
      setSearchResults(artist_data)

    },function(err) {
      auth.spotifyToken = "";
      promptAsync();
    })
  }


  // add widget functions
  function addPlaylistWidgets(newWidgets){
    if (checkWidgetLimit(newWidgets)){
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
            "url": newWidgets[i]['url'],
            "playlistID": newWidgets[i]['playlistID']
          })
        }).then(() => {
          console.log("widget added")
        }).catch((error) => {
          console.error(error);
          setdata("error with connecting to api")
        });
      }
      setDisplay("All")
      setPotentialWidgets(potentialWidgets - newWidgets.length)
    }
  }

  function addAlbumWidgets(newWidgets){
    console.log("adding widget:")
    console.log(newWidgets)
    if (checkWidgetLimit(newWidgets)){
      for (let i = 0; i < newWidgets.length; ++i){
        fetch('http://127.0.0.1:5000/addwidget', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "type": "music",
            "subtype": "album",
            "name": newWidgets[i]['albumName'],
            "url": newWidgets[i]['url'],
            "albumID": newWidgets[i]['albumID']
          })
        }).then(() => {
          console.log("widget added")
        }).catch((error) => {
          console.error(error);
          setdata("error with connecting to api")
        });
      }
      setDisplay("All")
      setPotentialWidgets(potentialWidgets - newWidgets.length)

    }

  }

  function addArtistWidgets(newWidgets){
    console.log("adding widget:")
    console.log(newWidgets)
    if (checkWidgetLimit(newWidgets)){
      for (let i = 0; i < newWidgets.length; ++i){
        fetch('http://127.0.0.1:5000/addwidget', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "type": "music",
            "subtype": "artist",
            "name": newWidgets[i]['name'],
            "url": newWidgets[i]['url'],
            "artistID": newWidgets[i]['artistID']
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

  }

  // check widget limit functions 
  useEffect(() => {
    fetch("http://127.0.0.1:5000/getwidgets", {mode: 'no-cors'}).then((response) => response.json())
      .then((json) => {
        if (json && Object.entries(json).length > 0){
          setPotentialWidgets(5 - Object.entries(json).length);
        }
        else{
          setPotentialWidgets(5);
        }
      }).catch((error) => {
        console.error(error);
        setPotentialWidgets(5);
      })
      .catch((error) => {
        console.error(error);
      });
  }, );

  function checkWidgetLimit(newWidgets){
    console.log(newWidgets);
    if (newWidgets.length > potentialWidgets){
      Alert.alert("Too many widgets selected. You already had " + (5 - potentialWidgets) + "widgets, and you've selected " + newWidgets.length + " widgets, and StraightForward has a limit of 5 widgets. Please try again, or head to the 'Manage Widgets' page to deselect contacts or navigation widgets.")
      return false;
    }
    return true;
  }



  console.log(display)
  console.log(potentialWidgets)


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
        { (display == "Playlists" || display == "All") && 
          <>
          <TouchableOpacity
          style={styles.button}
          onPress={() =>
              spotifyApi.getUserPlaylists('elizabethloeher')
              .then(function(data) {
                setDisplay("Playlists")
                console.log('Retrieved playlists', data.body);
                let playlist_data = [];
                let id = 0
                data.body.items.map((playlist) => {
                  let item = {};
                  item['playlistID'] = playlist['id']
                  item['id'] = id
                  item['name'] = playlist['name']
                  item['url'] = playlist['uri'];
                  playlist_data.push(item)
                  id += 1
                });
                console.log(playlist_data)
                setPlaylists(playlist_data)

              },function(err) {
                console.log('Something went wrong!', err);
                promptAsync();
              })
            }
        >

          <Text style={styles.buttonText}>Add Playlist Widget</Text>
        </TouchableOpacity>
        </>
      }
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
            onPress={() => setDisplay("Album")}
          >
            <Text style={styles.buttonText}>Add Album Widget</Text>
          </TouchableOpacity>
          </>
        }
        {
          display == "Album" && 
          <>
            <SearchBarSpotify searchFunction={searchAlbumName} />
            <ItemSelector items={searchResults} addWidgets={addAlbumWidgets}/>
          </>

        }
        { (display == "Artist" || display == "All") && 
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDisplay("Artist")}
          >
            <Text style={styles.buttonText}>Add Artist Widget</Text>
          </TouchableOpacity>
          </>
        }

        {
          display == "Artist" && 
          <>
            <SearchBarSpotify searchFunction={searchArtistName} />
            <ItemSelector items={searchResults} addWidgets={addArtistWidgets}/>
          </>

        }

        {/* { (display == "Podcast" || display == "All") && 
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("add podcast")}
          >
            <Text style={styles.buttonText}>Add Podcast Widget</Text>
          </TouchableOpacity>
          </>
        } */}

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