import React, { useState, useContext, useEffect, Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking, Alert, Platform, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { ResponseType, useAuthRequest, makeRedirectUri } from "expo-auth-session";
import SpotifyWebApi from "spotify-web-api-node";
import AuthContext from "../components/AuthContext";


const { width, height } = Dimensions.get('window');

// npm i react-native-phone-call --legacy-peer-deps
// npm install react-native-maps-directions --legacy-peer-deps

const origin = {latitude: 42.292894, longitude: -83.715395};
let destination = ""; // want to get from database
const GOOGLE_MAPS_APIKEY = 'AIzaSyCbD_d7uMnnYJ_kQxpQ8lQYhaOb5RwQgpI';

const Drive = ({ navigation }) => {
  const [names, setNames] = useState([]);
  const [contactWidgets, setContactWidgets] = useState([]);
  const [musicWidgets, setMusicWidgets] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [switchDestination, setSwitchDestination] = useState(false);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        console.log(vals)
        setNames(vals)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  const auth = useContext(AuthContext);
  const SpotifyApi = new SpotifyWebApi();
  SpotifyApi.setAccessToken(auth.spotifyToken);
  let deviceID = ''
  const redirectUri = makeRedirectUri();
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };



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
  

  SpotifyApi.getMyDevices()
  .then(function(data) {
    let availableDevices = data.body.devices;
    console.log("devices are", availableDevices);
    deviceID = data.body.devices[0]['id']
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  console.log(auth.spotifyToken)
  console.log(deviceID)
  console.log(playing)

  function playSpotify(item){
    if (item['subtype'] == 'playlist'){
      console.log("in if")
      SpotifyApi.getPlaylistTracks(item['playlistID'], {
        offset: 1,
        fields: 'items'
        }).then((data) => {
          SpotifyApi.play({
              context_uri: item['url'],
              device_id: deviceID,
              uri: data.body.items[0].track.uri 
            }).then(
            function () {
              console.log("playing: ", data.body);
            },
            function (err) {
              //if the user making the request is non-premium, a 403 FORBIDDEN response code
              console.log("Something went wrong!", err);
            })
        }).catch((err) => {
          console.log(err)
          console.log(item['playlistID'])
        })
      
    }
    else if (item['subtype'] == 'album'){
      SpotifyApi.getAlbumTracks(item['albumID'], {
        offset: 1,
        fields: 'items'
        }).then((data) => {
          console.log(data.body)
          SpotifyApi.play({
              context_uri: item['url'],
              device_id: deviceID,
              uri: data.body.items[0].uri 
            }).then(
            function () {
              console.log("playing: ", data.body);
            },
            function (err) {
              //if the user making the request is non-premium, a 403 FORBIDDEN response code
              console.log("Something went wrong!", err);
            })
        }).catch((err) => {
          console.log(err)
          console.log(item['albumID'])
        })


    }
    else if (item['subtype'] == 'artist'){
      SpotifyApi.getArtistTopTracks(item['artistID'], 'US',
        ).then((data) => {
          console.log(data.body)
          SpotifyApi.play({
              context_uri: item['url'],
              device_id: deviceID,
              uri: data.body.tracks[0].uri 
            }).then(
            function () {
              console.log("playing: ", data.body);
            },
            function (err) {
              //if the user making the request is non-premium, a 403 FORBIDDEN response code
              console.log("Something went wrong!", err);
            })
        }).catch((err) => {
          console.log(err)
          console.log(item['artistID'])
        })
    }
    setPlaying(true);
  }

  function pauseSpotify(){
    SpotifyApi.pause();
    setPlaying(false);
  }

  console.log("names", names)

  let temp_contacts = []
  let temp_music = []
  let temp_directions = []
  for (let i = 0; i < names.length; i++) {

    if (names[i]['type'] == 'contacts'){
      temp_contacts.push(
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => console.log("Call")}
        >
          <Text style={styles.buttonText}><FontAwesome name="phone" size={20} color="black" /> Call {names[i]['name']}</Text>
        </TouchableOpacity>
      )
    }
    else if (names[i]['type'] == 'music'){
      temp_music.push(
        <TouchableOpacity
          style={styles.musicButton}
          onPress={() => playing ? pauseSpotify() : playSpotify(names[i])}
        >
          <Text style={styles.buttonText}><FontAwesome name="music" size={20} color="black" /> Play {names[i]['name']}</Text>
        </TouchableOpacity>
      )
    }
    else if (names[i]['type'] == 'navigation'){
      temp_directions.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            destination = names[i]['name'];
            setSwitchDestination(!switchDestination);
          }
          }
        >
          <Text style={styles.buttonText}><FontAwesome name="map" size={20} color="black" /> {names[i]['name']}</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.sidebar}>
        {temp_contacts}
        {temp_music}
        {temp_directions}
      </View>
    </View>
  );
}

export default Drive;

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: 42.292894,
          longitude: -83.715395,
        },
        {
          latitude: 100,
          longitude: -83.738599,
        },
      ],
    };

    this.mapView = null;
  }

  // onMapPress = (e) => {
  //   this.setState({
  //     coordinates: [
  //       ...this.state.coordinates,
  //       e.nativeEvent.coordinate,
  //     ],
  //   });
  // }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 42.292894,
          longitude: -83.715395,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,  
        }}
        style={styles.map}
        ref={c => this.mapView = c}
        // onPress={this.onMapPress}
      >
        {/* {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )} */}
        {(this.state.coordinates.length >= 2) && (destination) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            destination= {destination}
            waypoints={[origin, destination]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}

export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    alignItems: 'center'
  },
  sidebar: {
    flex: 1,
    width: 200,
    alignItems: "center",
    justifyContent: "space-evenly",
    transform: [{ rotate: '-90deg' }],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    marginVertical: 30,
    height: 65,
    width: 140,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold'
  },
  map: {
    flex: 3,
    width: 600,
    height: "100%",
    transform: [{ rotate: '-90deg' }]
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#afdbc2',
    marginVertical: 30,
    height: 65,
    width: 140,
    borderRadius: 10,
  },
  musicButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1d3e3',
    marginVertical: 30,
    height: 65,
    width: 140,
    borderRadius: 10,
  },
});