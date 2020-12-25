import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";

import HomeStack from "./Stack/HomeStack";
import Header from "./global/Header";
import NowPlaying from "./Screens/NowPlaying";
import { Dimensions, View, StyleSheet } from "react-native";
import SongPlayer from "./components/SongPlayer";
import UpNext from "./components/UpNext";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <View style={styles.main}> */}
        <NavigationContainer>
          {/* <HomeStack /> */}
          <Stack.Navigator initialRouteName="Play">
            <Stack.Screen
              name="Home"
              component={HomeStack}
              options={({ navigation }) => ({
                headerTitle: () => (
                  <Header navigation={navigation} title="MusicMan" />
                ),
              })}
            />
            <Stack.Screen
              name="NowPlaying"
              component={NowPlaying}
              options={{ headerTitle: "Now Playing" }}
            />
            <Stack.Screen
              name="UpNext"
              component={UpNext}
              options={{ headerTitle: "Next Recommendations" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </View> */}
        <SongPlayer />
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("window").height - 70,
  },
});

export default App;
