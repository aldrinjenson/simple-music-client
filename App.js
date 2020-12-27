import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";

import Header from "./global/Header";
import NowPlaying from "./Screens/NowPlaying";
import SongPlayer from "./components/SongPlayer";
import UpNext from "./components/UpNext";
import SearchScreen from "./Screens/SearchScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Play">
            <Stack.Screen
              name="Home"
              component={SearchScreen}
              options={({ navigation }) => ({
                headerTitle: () => (
                  <Header navigation={navigation} title="SimpleMusic" />
                ),
              })}
            />
            <Stack.Screen
              name="NowPlaying"
              component={NowPlaying}
              options={{
                gestureEnabled: true,
                // cardStyleInterpolator:CardStyleInterpolators.
                headerBackImage: () => (
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={40}
                    color="black"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="UpNext"
              component={UpNext}
              options={{ headerTitle: "Next Recommendations" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <SongPlayer />
      </PaperProvider>
    </Provider>
  );
};
export default App;
