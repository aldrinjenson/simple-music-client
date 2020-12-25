import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../global/globalStyles";

const SongItem = ({ handleClick, item, imageUrl }) => {
  return (
    <TouchableOpacity onPress={() => handleClick(item)}>
      <Text>{JSON.stringify(item)}</Text>
      <View style={styles.horizonatalCard}>
        <Image style={styles.bookImage} source={imageUrl} />
        <View style={styles.textContent}>
          <Text style={globalStyles.title}>{item.name}</Text>
          {item.artist && <Text>{item.artist.name}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({
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
