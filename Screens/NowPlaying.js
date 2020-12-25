import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiDispatch, milliToTime } from "../global/utils";
import { TOGGLE_PAUSE } from "../redux/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const { height, width } = Dimensions.get("window");

const NowPlaying = ({ navigation }) => {
  const {
    nowPlaying,
    soundObject,
    isPaused,
    isSongPlaying,
    isUrlLoading,
  } = useSelector((state) => state.songReducer);
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState("00:00");

  let imageUrl = nowPlaying?.thumbnails
    ? { uri: `${nowPlaying.thumbnails[0].url}` }
    : require("../assets/no_preview_image.png");

  const handlePause = async () => {
    if (soundObject) {
      if (isPaused) {
        await soundObject.playAsync();
      } else {
        await soundObject.pauseAsync();
      }
    }
    dispatch(apiDispatch(TOGGLE_PAUSE));
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      if (soundObject) {
        soundObject.getStatusAsync().then((status) => {
          setSliderValue(status.positionMillis / nowPlaying.duration);
          setDuration(milliToTime(status.positionMillis));
        });
      }
    }, 500);
    return () => {
      clearInterval(sliderInterval);
    };
  }, [isSongPlaying]);

  const handlePrevious = () => {};
  const handleNext = () => {};

  const handleSliderChange = async (ratio) => {
    if (soundObject) {
      soundObject.getStatusAsync().then((status) => {
        soundObject.setPositionAsync(status.durationMillis * ratio);
      });
    }
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#2C2C2CAA" }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 70,
          // backgroundColor: "pink",
        }}
      >
        <Image style={styles.thumbnail} source={imageUrl} />
      </View>
      <Text style={styles.title}>{nowPlaying?.name}</Text>
      <Text style={styles.artist}>{nowPlaying?.artist.name}</Text>

      <View style={{ position: "relative" }}>
        <Slider
          style={{ width: width - 40, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{}}>{duration}</Text>
          <Text style={{}}>{milliToTime(nowPlaying.duration)}</Text>
        </View>
      </View>

      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={() => handlePrevious()}>
          <MaterialCommunityIcons
            name={"repeat" || "repeat-off" || "repeat-once"}
            size={30}
            color="black"
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handlePrevious()}>
            <MaterialIcons name="skip-previous" size={70} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePause()}>
            <MaterialIcons
              style={styles.pauseButton}
              name={isPaused ? "play-circle-fill" : "pause-circle-filled"}
              size={70}
              color={isUrlLoading ? "grey" : "green"}
              onPress={handlePause}
              style={styles.pauseButton}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNext()}>
            <MaterialIcons name="skip-next" size={70} color="grey" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleNext()}>
          <AntDesign name={"hearto" || "heart"} size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Button title="Up Next" onPress={() => navigation.navigate("UpNext")} />
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  thumbnail: {
    height: width * 0.75,
    width: width * 0.75,
  },
  title: {
    // fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
  },
  artist: {
    textAlign: "center",
    fontWeight: "200",
    marginVertical: 5,
  },
  endTime: {
    position: "absolute",
  },
  pauseButton: {
    // backgroundColor: "green",
    // width: 50,
    // height: 50,
    // borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  controlButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  fab: {},
});
