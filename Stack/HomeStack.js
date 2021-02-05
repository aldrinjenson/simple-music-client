import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import SearchScreen from "../Screens/SearchScreen";
// import HomeScreen from "../Screens/HomeScreen";

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#2f95dc" : "#000"}
              name="search"
              size={23}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#2f95dc" : "#000"}
              name="home"
              size={23}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default HomeStack;
