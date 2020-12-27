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
import { milliToTime } from "../global/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  incrementPlayIndex,
  decrementPlayIndex,
  togglePause,
} from "../redux/actions/songActions";

const { height, width } = Dimensions.get("window");

const NowPlaying = ({ navigation }) => {
  const {
    nowPlaying,
    soundObject,
    isPaused,
    isSongPlaying,
    isUrlLoading,
    currentSongThumbnail,
    currentPlayIndex,
  } = useSelector((state) => state.songReducer);

  let imageUrl = nowPlaying?.thumbnails
    ? { uri: `${nowPlaying.thumbnails[0].url}` }
    : require("../assets/no_preview_image.png");

  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(0);
  const [imgLink, setImgLink] = useState(imageUrl);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (currentSongThumbnail) {
      setImgLink({ uri: currentSongThumbnail });
    } else {
      setImgLink(imageUrl);
    }
  }, [currentSongThumbnail]);

  const handlePause = async () => {
    dispatch(togglePause());
  };

  useEffect(() => {
    console.log("in useeffect");
    const sliderInterval = setInterval(() => {
      if (soundObject) {
        soundObject.getStatusAsync().then((status) => {
          const { positionMillis } = status;
          setSliderValue(positionMillis / status.durationMillis);
          setDuration(milliToTime(positionMillis));
        });
      }
    }, 500);
    return () => {
      clearInterval(sliderInterval);
    };
  }, [soundObject]);

  const handleNext = () => {
    // if (currentPlayIndex < suggestedSongs?.length)
    dispatch(incrementPlayIndex());
  };
  const handlePrevious = () => {
    if (currentPlayIndex > 1) {
      dispatch(decrementPlayIndex());
    }
  };

  const handleSliderChange = async (ratio) => {
    if (soundObject) {
      soundObject.getStatusAsync().then((status) => {
        soundObject.setPositionAsync(status.durationMillis * ratio);
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#2C2C2CAA",
        justifyContent: "space-evenly",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 70,
        }}
      >
        <Image style={styles.thumbnail} source={imgLink} />
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={styles.title}>{nowPlaying?.name}</Text>
          <Text style={styles.artist}>{nowPlaying?.artist.name}</Text>
        </View>
      </View>

      <View>
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{}}>{duration}</Text>
            <Text style={{}}>{milliToTime(nowPlaying.duration)}</Text>
          </View>
        </View>

        <View style={styles.controlButtons}>
          <MaterialCommunityIcons
            name={"repeat" || "repeat-off" || "repeat-once"}
            size={30}
            color="black"
            onPress={() => handlePrevious()}
          />

          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="skip-previous"
              onPress={() => handlePrevious()}
              size={70}
              color="grey"
              borderRadius={currentPlayIndex !== 0}
            />
            <TouchableOpacity onPress={() => handlePause()}>
              <MaterialIcons
                name={isPaused ? "play-circle-fill" : "pause-circle-filled"}
                size={70}
                color={isUrlLoading ? "grey" : "green"}
                onPress={handlePause}
              />
            </TouchableOpacity>

            <MaterialIcons
              onPress={() => handleNext()}
              name="skip-next"
              size={70}
              color="grey"
            />
          </View>

          <MaterialIcons
            name="queue-music"
            size={30}
            color="black"
            onPress={() => navigation.navigate("UpNext")}
          />
        </View>
        {isUrlLoading && (
          <Text style={{ textAlign: "center", fontSize: 14, marginBottom: 10 }}>
            Bufferring Song...
          </Text>
        )}
      </View>
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
    fontWeight: "400",
    fontSize: 20,
  },
  artist: {
    fontWeight: "200",
  },
  endTime: {
    position: "absolute",
  },
  controlButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  fab: {},
});
