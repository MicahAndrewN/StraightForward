// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import CustomizeHome from "../screens/CustomizeHome";
import Preview from "../screens/Preview";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="CustomizeHome"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={CustomizeHome}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="color-palette" color={color} />
          ),
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
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CustomizeStack = createStackNavigator();

function CustomizeHomeNavigator() {
  return (
    <CustomizeStack.Navigator>
      <CustomizeStack.Screen
        name="Home"
        component={CustomizeHome}
        options={{ headerTitle: "StraightForward" }}
      />
      <CustomizeStack.Screen
        name="Contacts"
        component={AddContacts}
        options={{ headerTitle: "Add Contacts" }}
      />
    </CustomizeStack.Navigator>
  );
}

const PreviewStack = createStackNavigator();

function PreviewNavigator() {
  return (
    <PreviewStack.Navigator>
      <PreviewStack.Screen
        name="Preview"
        component={Preview}
        options={{ headerTitle: "Preview" }}
      />
    </PreviewStack.Navigator>
  );
}
