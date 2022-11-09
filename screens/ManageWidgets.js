import { StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Switch, Modal, Image } from "react-native";
import { GestureHandlerRefContext } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import React, { useState, useEffect, useContext } from "react";
import { ColorMode, WidgetLayout } from "../navigation/index"


const ManageWidgets = ({ navigation }) => {

  const [data, setdata] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [colorMode, setColorMode] = useContext(ColorMode);
  const [widgetLayout, setWidgetLayout] = useContext(WidgetLayout)

  const toggleSwitch = () => colorMode === "dark" ? setColorMode("light") : setColorMode("dark");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colorMode === "dark" ? "#000" : "#FFFFFF"
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      marginTop: 10,
      marginBottom: 10,
      height: 65,
      width: 250,
      borderRadius: 20,
    },
    modalView: {
      margin: 20,
      backgroundColor: colorMode === "dark" ? "gray" : "#FFF",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4285F4',
      marginTop: 10,
      marginBottom: 10,
      height: 50,
      width: 150,
      borderRadius: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    darkModeText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
      color: colorMode === "dark" ? "#FFFFFF" : "#000"
    },
    image: {
      width: 100,
      height: 100
    },
    top: {
      alignItems: 'center',
      backgroundColor: widgetLayout === "top" ? "#DDD" : colorMode === "dark" ? "gray" : "#FFF",
      marginTop: 10,
      borderRadius: 10,
    },
    left: {
      alignItems: 'center',
      backgroundColor: widgetLayout === "left" ? "#DDD" : colorMode === "dark" ? "gray" : "#FFF",
      borderRadius: 10,
    },
    right: {
      alignItems: 'center',
      backgroundColor: widgetLayout === "right" ? "#DDD" : colorMode === "dark" ? "gray" : "#FFF",
      borderRadius: 10,
    },
    bottom: {
      alignItems: 'center',
      backgroundColor: widgetLayout === "bottom" ? "#DDD" : colorMode === "dark" ? "gray" : "#FFF",
      borderRadius: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold'
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customize',
          {
            screen: 'DeleteWidgets',
            params: {}
          })}
      >
        <Text style={styles.text}>Delete Widgets</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>Choose Widget Layout</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>Choose Layout</Text>

          <TouchableOpacity
            style={styles.top}
            onPress={() => setWidgetLayout("top")}
          >
            <Text>Top</Text>
            <Image style={styles.image} source={require('../assets/images/top.png')} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.left}
              onPress={() => setWidgetLayout("left")}
            >
              <Text>Left</Text>
              <Image style={styles.image} source={require('../assets/images/left.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.right}
              onPress={() => setWidgetLayout("right")}
            >
              <Text>Right</Text>
              <Image style={styles.image} source={require('../assets/images/right.png')} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.bottom}
            onPress={() => setWidgetLayout("bottom")}
          >
            <Text>Bottom</Text>
            <Image style={styles.image} source={require('../assets/images/bottom.png')} />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{color: "#FFF", fontWeight: "bold"}}>Save</Text>
          </TouchableOpacity>
        </View> 
      </Modal>
      <Text style={styles.darkModeText}>Toggle {colorMode === "dark" ? "Light" : "Dark"} Mode:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#4285F4" }}
        activeThumbColor={"#FFF"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          toggleSwitch();
        }}
        value={colorMode === "dark" ? true : false }
      />
    </SafeAreaView>
  );
}

export default ManageWidgets;


