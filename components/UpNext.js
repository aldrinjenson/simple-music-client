import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DisplaySongs from "./DisplaySongs";
import { updatePlayIndex } from "../redux/actions/songActions";
import {
  getSuggestedSongsList,
  removeSongFromSuggestions,
} from "../redux/actions/searchActions";
import BottomBar from "./BottomBar";

const UpNext = ({ navigation }) => {
  const { isSuggestedSongsLoading, suggestedSongs } = useSelector(
    (state) => state.searchReducer
  );
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleClick = (song) => {
    const songIndex = suggestedSongs.indexOf(song);
    dispatch(updatePlayIndex(songIndex));

    if (songIndex === suggestedSongs.length - 1) {
      dispatch(getSuggestedSongsList(song.videoId));
    }

    navigation.pop();
  };

  const handleSecondary = (song) => {
    console.log("deleting" + song.name);
    dispatch(removeSongFromSuggestions(song));
    setMsg("Removed from playlist");
    setTimeout(() => {
      setMsg("");
    }, 1700);
  };

  return (
    <View style={{ flex: 1 }}>
      {isSuggestedSongsLoading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator
            style={{ marginTop: 30, marginBottom: 10 }}
            size="large"
            color="0000ff"
          />
          <Text style={{}}>Loading...</Text>
          <Text style={{ marginTop: 30 }}>
            Sit back and relax, fetching recommended songs
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <DisplaySongs
            iconName="delete"
            songs={suggestedSongs}
            handleClick={handleClick}
            secondaryAction={handleSecondary}
          />

          {msg.length !== 0 && (
            <View
              style={{
                backgroundColor: "grey",
                position: "absolute",
                bottom: 25,
                width: "100%",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 20,
                  fontSize: 16,
                }}
              >
                {msg}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default UpNext;

const styles = StyleSheet.create({});
