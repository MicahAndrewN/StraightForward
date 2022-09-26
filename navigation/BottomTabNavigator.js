// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import CustomizeHome from "../screens/CustomizeHome";
import Contacts from "../screens/Contacts";
import Preview from "../screens/Preview";

const CustomizeStackNav = createStackNavigator();

const CustomizeStack = () => {
  return (
    <CustomizeStackNav.Navigator initialRouteName='CustomizeHome' >
      <CustomizeStackNav.Screen
        name="CustomizeHome"
        component={CustomizeHome}
        options={{ headerTitle: "StraightForward" }}
      />
      <CustomizeStackNav.Screen
        name="Contacts"
        component={Contacts}
        options={{ headerTitle: "Add Contacts" }}
      />
    </CustomizeStackNav.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Customize"
        component={CustomizeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="color-palette" color={color} />
          ),
          headerShown: false,
          
        }}
      />
      <BottomTab.Screen
        name="Preview"
        component={Preview}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="eye" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab


