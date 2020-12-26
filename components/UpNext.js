import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiDispatch } from "../global/utils";
import DisplaySongs from "./DisplaySongs";
import { getSongDetails, setCurrentSong } from "../redux/actions/songActions";

const UpNext = ({ navigation }) => {
  const { isSuggestedSongsLoading, suggestedSongs } = useSelector(
    (state) => state.searchReducer
  );

  const dispatch = useDispatch();

  const handleClick = (song) => {
    dispatch(getSongDetails(song));
    navigation.navigate("NowPlaying");
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
        <DisplaySongs songs={suggestedSongs} handleClick={handleClick} />
      )}
    </View>
  );
};

export default UpNext;

const styles = StyleSheet.create({});
