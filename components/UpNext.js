import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

import DisplaySongs from "./DisplaySongs";
import { updatePlayIndex } from "../redux/actions/songActions";
import {
  getSuggestedSongsList,
  removeSongFromSuggestions,
} from "../redux/actions/searchActions";

const UpNext = ({ navigation }) => {
  const { isSuggestedSongsLoading, suggestedSongs } = useSelector(
    (state) => state.searchReducer
  );

  const dispatch = useDispatch();

  const handleClick = (song) => {
    const songIndex = suggestedSongs.indexOf(song);
    if (songIndex === suggestedSongs.length - 1) {
      dispatch(getSuggestedSongsList(song.videoId));
    } else {
      dispatch(updatePlayIndex(songIndex));
    }
    navigation.pop();
  };

  const handleSecondary = (song) => {
    console.log("Deleting " + song.name);
    dispatch(removeSongFromSuggestions(song));
    Toast.show("Removed from playlist");
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
          <Text>Loading...</Text>
          <Text style={{ marginTop: 30 }}>
            Sit back and relax, fetching recommended songs
          </Text>
        </View>
      ) : (
        <DisplaySongs
          iconName="delete"
          songs={suggestedSongs}
          handleClick={handleClick}
          secondaryAction={handleSecondary}
        />
      )}
    </View>
  );
};

export default UpNext;

const styles = StyleSheet.create({});
