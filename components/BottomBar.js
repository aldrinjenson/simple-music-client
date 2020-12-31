import React from "react";
import TextTicker from "react-native-text-ticker";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { togglePause, updatePlayIndex } from "../redux/actions/songActions";

const BottomBar = ({ navigation }) => {
  const isUrlLoading = useSelector((state) => state.searchReducer.isUrlLoading);
  const isPaused = useSelector((state) => state.songReducer.isPaused);
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  const currentPlayIndex = useSelector(
    (state) => state.songReducer.currentPlayIndex
  );

  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(updatePlayIndex(currentPlayIndex + 1));
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          maxWidth: "80%",
        }}
        onPress={() => navigation.navigate("NowPlaying")}
      >
        <Image
          style={styles.tabImage}
          source={{ uri: `${nowPlaying.thumbnails[0].url}` }}
        />
        <View style={{ marginLeft: 10, width: "70%" }}>
          <TextTicker
            style={{ fontSize: 18 }}
            duration={13000}
            marqueeDelay={1000}
          >
            {nowPlaying.name}
          </TextTicker>
          <Text>{nowPlaying.artist.name}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name={isPaused ? "play-circle-fill" : "pause-circle-filled"}
          size={45}
          color={isUrlLoading ? "grey" : "green"}
          color="green"
          onPress={() => dispatch(togglePause())}
        />

        <MaterialIcons
          onPress={() => handleNext()}
          name="skip-next"
          size={45}
          color="white"
        />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabImage: {
    width: 60,
    height: 60,
  },
  bottomBar: {
    minHeight: "9%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "grey",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
