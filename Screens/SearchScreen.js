import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import DisplaySongs from "../components/DisplaySongs";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongToSuggestions,
  getSongsList,
  getSuggestedSongsList,
} from "../redux/actions/searchActions";
import { getSongDetails } from "../redux/actions/songActions";
import BottomBar from "../components/BottomBar";

const SearchScreen = ({ navigation }) => {
  const [value, setValue] = useState("fearless");
  const [msg, setMsg] = useState("");
  const isLoading = useSelector((state) => state.searchReducer.isLoading);
  const searchResults = useSelector(
    (state) => state.searchReducer.searchResults
  );
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  const suggestedSongs = useSelector(
    (state) => state.searchReducer.suggestedSongs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (value) {
      dispatch(getSongsList(value));
    }
  }, [value]);

  const handleClick = (song) => {
    console.log("VideoId = " + song.videoId);
    dispatch(getSongDetails(song));
    dispatch(getSuggestedSongsList(song.videoId));
    navigation.navigate("NowPlaying");
  };

  const handleSecondary = (song) => {
    if (song.videoId !== nowPlaying.videoId && !suggestedSongs.includes(song)) {
      dispatch(addSongToSuggestions(song));
      setMsg("Added to Queue");
      setTimeout(() => {
        setMsg("");
      }, 1700);
    }
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
          <DisplaySongs
            iconName={suggestedSongs.length ? "playlist-add" : ""}
            songs={searchResults}
            handleClick={handleClick}
            secondaryAction={handleSecondary}
          />
        )}
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
      {nowPlaying && <BottomBar navigation={navigation} />}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
