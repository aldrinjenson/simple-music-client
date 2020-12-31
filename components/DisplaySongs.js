import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const DisplaySongs = ({ songs, handleClick, secondaryAction, iconName }) => {
  const nowPlaying = useSelector((state) => state.songReducer.nowPlaying);
  if (!songs)
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
          paddingHorizontal: 20,
        }}
      >
        <Text>Sorry, No such Song exists in our database!!</Text>
        <Text>Please check your search query</Text>
      </View>
    );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <SongItem
              iconName={iconName}
              item={item}
              handleClick={handleClick}
              shouldHighLight={nowPlaying?.videoId === item.videoId}
              secondaryAction={secondaryAction}
            />
          );
        }}
      />
    </View>
  );
};

export default DisplaySongs;
