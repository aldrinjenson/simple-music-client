import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import DisplaySongs from "../components/DisplaySongs";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongsList,
  getSuggestedSongsList,
} from "../redux/actions/searchActions";
import { getSongDetails } from "../redux/actions/songActions";

const SearchScreen = ({ navigation }) => {
  const [value, setValue] = useState("Believer");
  const dispatch = useDispatch();
  const { isLoading, songs } = useSelector((state) => state.searchReducer);
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  // console.log(songs);
  useEffect(() => {
    if (value) {
      dispatch(getSongsList(value));
    }
  }, [value]);

  const handleClick = (song) => {
    dispatch(getSongDetails(song));
    console.log("dispatching, id = " + song.videoId);
    dispatch(getSuggestedSongsList(song.videoId));
    navigation.navigate("NowPlaying");
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={value}
        setValue={setValue}
        placeholder="Enter Song name"
      />

      {!value && (
        <View>
          <Text>Search and select a song of your choice,</Text>
          <Text>Sit back and relax.</Text>
          <Text>
            Songs will be played from a curated playlist of related songs!
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="0000ff" />
            <Text style={{ alignSelf: "center" }}>Loading...</Text>
          </View>
        ) : (
          <DisplaySongs songs={songs} handleClick={handleClick} />
        )}
      </View>
      {nowPlaying && (
        <Button
          onPress={() => navigation.navigate("NowPlaying")}
          title="Now Playing"
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
