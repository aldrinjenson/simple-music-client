import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SongItem from "./SongItem";

const DisplaySongs = ({ songs, handleClick }) => {
  console.log(songs);
  console.log("in display screen");
  if (!songs)
    return (
      <View
        style={{
          justifyContent: "center",
          alignsongs: "center",
          marginTop: 200,
        }}
      >
        <Text>Sorry, No such Song exists in our database!!</Text>
        <Text>Please check your search query</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          let imageUrl = item.thumbnails
            ? { uri: `${item.thumbnails[0].url}` }
            : require("../assets/no_preview_image.png");
          return (
            <View>
              <Text>Hello</Text>
              <SongItem
                item={item}
                imageUrl={imageUrl}
                handleClick={handleClick}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default DisplaySongs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
