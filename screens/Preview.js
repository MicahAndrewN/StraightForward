import { StyleSheet, Spinner } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <ErrorComponent />;
    case Status.SUCCESS:
      return <MyMapComponent />;
  }
};

function MyMapComponent({
  center,
  zoom,
}) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}

const RenderMap = () => (
  <View>
    <Wrapper apiKey={"AIzaSyCbD_d7uMnnYJ_kQxpQ8lQYhaOb5RwQgpI"} render={render}>
      <MyMapComponent />
    </Wrapper>
  </View>
);

export default function Preview() {
  const getNamesToCall = () => {
    //Returns a list of names to make call buttons for
    let names = [];
    fetch('http://127.0.0.1:5000/getwidgets').then((response) => response.json()).then((json) => {
      for (var i in json)
        names.push(json[i].name)
    })
    console.log(names)
    return names
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      // TODO loop over names returned from getNamesToCall and make call buttons for each
      // TODO add static image of map
      
      />
      <Text>Preview screen will go here.</Text>
      {RenderMap()}
    </View>
  );
}

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
});
