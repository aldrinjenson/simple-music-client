import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const DisplaySongs = ({ songs, handleClick }) => {
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
          let imageUrl = item.thumbnails
            ? { uri: `${item.thumbnails[0].url}` }
            : require("../assets/no_preview_image.png");
          return (
            <SongItem
              item={item}
              imageUrl={imageUrl}
              handleClick={handleClick}
              shouldHighLight={nowPlaying?.videoId === item.videoId}
            />
          );
        }}
      />
    </View>
  );
};

export default DisplaySongs;
