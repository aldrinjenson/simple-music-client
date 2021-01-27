import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { globalStyles } from "../global/globalStyles";

const DisplayAlbums = () => {
  const albums = useSelector((state) => state.searchReducer.albums);
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          let imageUrl = item.thumbnails?.length
            ? { uri: `${item.thumbnails[0].url}` }
            : // eslint-disable-next-line no-undef
              require("../assets/no_preview_image.png");
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.horizonatalCard}>
                <Image style={styles.bookImage} source={imageUrl} />
                <View style={styles.textContent}>
                  <Text style={globalStyles.title}>{item.name}</Text>
                  <Text>{item.artist}</Text>
                  <Text>Year: {item.year}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DisplayAlbums;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "pink",
    // flexDirection: "row",
  },

  bookList: {
    flex: 1,
    flexDirection: "row",
  },
  horizonatalCard: {
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "#aaa",
    alignItems: "center",
    padding: 3,
    margin: 6,
  },
  bookImage: {
    height: 95,
    width: 80,
    margin: 4,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
});
