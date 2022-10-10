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

const RenderMap = () =>(
  <View>
  <Wrapper apiKey={"AIzaSyCbD_d7uMnnYJ_kQxpQ8lQYhaOb5RwQgpI"} render={render}>
    <MyMapComponent />
  </Wrapper>
  </View>
);

export default function Preview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        // TODO loop over widgets returned from 
        // API endpoint /getwidgets
        // each will have a "type" and "subtype"
        // for Alpha all types will be "contacts" and subtype "call"
        // call widgets have a "name" attribute which are contact names
        // Render widgets with "name"
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
