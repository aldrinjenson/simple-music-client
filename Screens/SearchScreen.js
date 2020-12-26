import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { apiUrl } from "../env";
import SearchBar from "../components/SearchBar";
import DisplaySongs from "../components/DisplaySongs";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongsList,
  getSuggestedSongsList,
} from "../redux/actions/searchActions";
import DisplayAlbums from "../components/DisplayAlbums";
import { getSongDetails } from "../redux/actions/songActions";

const SearchScreen = ({ navigation }) => {
  const [value, setValue] = useState("believer");
  const dispatch = useDispatch();
  const { isLoading, songs } = useSelector((state) => state.searchReducer);
  const nowPlaying = useSelector((state) => state.searchReducer.nowPlaying);
  // console.log(songs);
  useEffect(() => {
    if (value) {
      dispatch(getSongsList(value));
    }
    return () => {
      setValue("");
    };
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
