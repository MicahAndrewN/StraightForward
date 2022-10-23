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
import { useState } from "react";



export default function Navigation({ colorScheme }) {

  const [user, setUser] = useState(false)

  fetch("http://127.0.0.1:5000/getname").then((response) => response.json())
  .then((json) => {
    setUser(true)
  }).catch((error) => {
    console.error(error);
    setUser(false)
  })
  .catch((error) => {
    console.error(error);
    setUser(false)
  });
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {user ? <BottomTabNavigator/> : <AuthStack/> }
    </NavigationContainer>
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
