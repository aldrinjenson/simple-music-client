import React from "react";
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
import { togglePause } from "../redux/actions/songActions";

const BottomBar = ({ navigation }) => {
  const dispatch = useDispatch();
  const isPaused = useSelector((state) => state.songReducer.isPaused);
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  const isUrlLoading = useSelector((state) => state.searchReducer.isUrlLoading);

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          backgroundColor: "pink",
        }}
        onPress={() => navigation.navigate("NowPlaying")}
      >
        <Image
          style={styles.tabImage}
          source={{ uri: `${nowPlaying.thumbnails[0].url}` }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            // onLayout={(e) => {
            //   const { x, y, width, height } = e.nativeEvent.layout;
            // }}
            style={styles.title}
            numberOfLines={1}
          >
            {nowPlaying.name}
          </Text>
          <Text>{nowPlaying.artist.name}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name={isPaused ? "pause-circle-filled" : "play-circle-fill"}
          size={55}
          color={isUrlLoading ? "grey" : "green"}
          color="green"
          onPress={() => dispatch(togglePause())}
        />

        <MaterialIcons
          // onPress={() => handleNext()}
          name="skip-next"
          size={55}
          color="white"
        />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabImage: {
    width: 77,
    height: 77,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "grey",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  title: { fontSize: 18, maxWidth: "80%" },
});
