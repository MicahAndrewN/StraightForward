import React, { useState, useEffect, Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking, Alert, Platform, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// npm i react-native-phone-call --legacy-peer-deps
// npm install react-native-maps-directions --legacy-peer-deps

const origin = {latitude: 42.292894, longitude: -83.715395};
const destination = "Burton Memorial Tower"; // want to get from database
const GOOGLE_MAPS_APIKEY = 'AIzaSyCbD_d7uMnnYJ_kQxpQ8lQYhaOb5RwQgpI';

const Drive = ({ navigation }) => {
  const [names, setNames] = useState([]);
  const [contactWidgets, setContactWidgets] = useState([]);
  const [musicWidgets, setMusicWidgets] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/getwidgets', { mode: 'no-cors' })
      .then((response) => response.json()).catch((error) => console.log(error)).then((json) => {
        var vals = Object.values(json)
        console.log(vals)
        setNames(vals)
        }).catch((error) => console.log("error1 " + error))
  }, []);

  console.log("names", names)

  let temp_contacts = []
  let temp_music = []
  let temp_directions = []
  for (let i = 0; i < names.length; i++) {

    if (names[i]['type'] == 'contacts'){
      temp_contacts.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Call")}
        >
          <Text style={styles.buttonText}><FontAwesome name="phone" size={20} color="black" /> Call {names[i]['name']}</Text>
        </TouchableOpacity>
      )
    }
    else if (names[i]['type'] == 'music'){
      temp_music.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Call")}
        >
          <Text style={styles.buttonText}><FontAwesome name="music" size={20} color="black" /> Play {names[i]['name']}</Text>
        </TouchableOpacity>
      )
    }
    else if (names[i]['type'] == 'address'){
      temp_directions.push(
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Call")}
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
        {(this.state.coordinates.length >= 2) && (
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
    flex: 1,
    width: 336,
    height: '100%',
    backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    alignItems: 'center'
  },
  sidebar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    transform: [{ rotate: '-90deg' }],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    marginTop: 10,
    height: 65,
    width: 110,
  },
  buttonText: {
    fontWeight: 'bold'
  },
  map: {
    flex: 3,
    width: 600,
    height: "100%",
    transform: [{ rotate: '-90deg' }]
  }
});