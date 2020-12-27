import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { milliToTime } from "../global/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { updatePlayIndex, togglePause } from "../redux/actions/songActions";

const { width } = Dimensions.get("window");

const NowPlaying = ({ navigation }) => {
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  const soundObject = useSelector((state) => state.songReducer.soundObject);
  const isPaused = useSelector((state) => state.songReducer.isPaused);
  const isUrlLoading = useSelector((state) => state.songReducer.isUrlLoading);
  const currentSongThumbnail = useSelector(
    (state) => state.songReducer.currentSongThumbnail
  );
  const currentPlayIndex = useSelector(
    (state) => state.songReducer.currentPlayIndex
  );
  const isSuggestedSongsLoading = useSelector(
    (state) => state.searchReducer.isSuggestedSongsLoading
  );

  let imageUrl = nowPlaying?.thumbnails
    ? { uri: `${nowPlaying.thumbnails[0].url}` }
    : require("../assets/no_preview_image.png");

  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(0);
  const [bottomMsg, setBottomMsg] = useState("");
  const [imgLink, setImgLink] = useState(imageUrl);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (currentSongThumbnail) {
      setImgLink({ uri: currentSongThumbnail });
    } else {
      setImgLink(imageUrl);
    }
  }, [currentSongThumbnail]);

  useEffect(() => {
    if (isUrlLoading) {
      setBottomMsg("Loading Song..");
    } else {
      setBottomMsg("");
    }
  }, [isUrlLoading]);

  const handlePause = async () => {
    dispatch(togglePause());
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      soundObject?.getStatusAsync().then((status) => {
        if (status.isLoaded) {
          const { positionMillis } = status;
          setSliderValue(positionMillis / status.durationMillis);
          setDuration(milliToTime(positionMillis));
        }
      });
    }, 500);
    return () => {
      clearInterval(sliderInterval);
    };
  }, [soundObject]);

  const handleNext = () => {
    if (isSuggestedSongsLoading) {
      setBottomMsg("Please wait while playlist loads..");
      setTimeout(() => {
        setBottomMsg("");
      }, 1000);
    } else {
      dispatch(updatePlayIndex(currentPlayIndex + 1));
    }
  };

  const handlePrevious = () => {
    console.log("in function");
    console.log({ currentPlayIndex });
    if (currentPlayIndex === 0) {
      setBottomMsg("Currently playing is the first song");
      setTimeout(() => {
        setBottomMsg("");
      }, 1500);
    } else {
      dispatch(updatePlayIndex(currentPlayIndex - 1));
    }
  };

  const handleSliderChange = async (ratio) => {
    soundObject.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        soundObject.setPositionAsync(status.durationMillis * ratio);
      }
    });
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

      <View
        style={
          {
            //  position: "relative"
          }
        }
      >
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
          <Text>{duration}</Text>
          <Text>
            {nowPlaying.duration ? milliToTime(nowPlaying.duration) : null}
          </Text>
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
            onPress={handlePrevious}
            size={70}
            color="grey"
            borderRadius={currentPlayIndex !== 0}
          />
          <MaterialIcons
            name={isPaused ? "pause-circle-filled" : "play-circle-fill"}
            size={70}
            color={isUrlLoading ? "grey" : "green"}
            onPress={handlePause}
          />

          <MaterialIcons
            onPress={handleNext}
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
      <Text style={{ textAlign: "center", fontSize: 14, marginBottom: 10 }}>
        {bottomMsg}
      </Text>
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
    flexWrap: "wrap",
    textAlign: "center",
    marginBottom: 10,
  },
  artist: {
    fontWeight: "200",
  },
  // endTime: {
  //   position: "absolute",
  // },
  controlButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});
