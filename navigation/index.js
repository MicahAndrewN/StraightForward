// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthContext from "../components/AuthContext";
import * as React from "react";
import TokenReducer from '../store/reducers/token';
import Provider from 'react-native';

export const ColorMode = React.createContext();
export const WidgetLayout = React.createContext();

export default function Navigation({ colorScheme }) {

  const [loggedIn, setLoggedIn] = React.useState(false);

  const auth = React.useContext(AuthContext);
  const [colorMode, setColorMode] = React.useState("light");
  const [widgetLayout, setWidgetLayout] = React.useState("left");

  const logIn = (username, password)=>{
    console.log("logIn")
    console.log(username)
    fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            // 'password': password,
        }),
        mode: 'no-cors'
    }).then((response) => {
        response = response.json();
        console.log(response)
        console.log("successfully logged in on index")
        auth.status = true;
        setLoggedIn(true);

    }).catch((error) => {
        console.error(error);
    });
  }

  const logOut = () => {
    fetch('http://127.0.0.1:5000/logout', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then(() => {
      console.log("logging out")
      auth.status = false;
      setLoggedIn(false);
      console.log("authy", auth)
    }).catch((error) => {
      console.error(error)})
  }
  console.log(auth)
  return (
    <AuthContext.Provider value={{ status: loggedIn, login: logIn, spotifyToken: '', logout: logOut }}>
        <ColorMode.Provider value={[colorMode, setColorMode]}>
        <WidgetLayout.Provider value={[widgetLayout, setWidgetLayout]}>
          <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorMode === "dark" ? DarkTheme : DefaultTheme}
          >
            {auth.status ? <BottomTabNavigator/> : <AuthStack/> }
          </NavigationContainer>
        </WidgetLayout.Provider>
        </ColorMode.Provider>
      </AuthContext.Provider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator();

// function RootNavigator() {


//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Logged In" component={BottomTabNavigator} />
//       <Stack.Screen name="Logged Out" component={AuthStack} />
//       <Stack.Screen
//         name="NotFound"
//         component={NotFoundScreen}
//         options={{ title: "Oops!" }}
//       />
//     </Stack.Navigator>
//   );
// }
