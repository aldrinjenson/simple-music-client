import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../global/globalStyles";

const SongItem = ({
  handleClick,
  item,
  shouldHighLight,
  iconName,
  secondaryAction = () => {},
}) => {
  
  const imageUrl = item.thumbnails
    ? { uri: `${item.thumbnails[0].url}` }
    : require("../assets/no_preview_image.png");

  return (
    <View
      style={{
        ...styles.horizonatalCard,
        backgroundColor: shouldHighLight ? "grey" : "transparent",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flexGrow: 1,
          maxWidth: "88%",
        }}
        onPress={() => handleClick(item)}
      >
        <Image style={styles.bookImage} source={imageUrl} />
        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...globalStyles.title, flexWrap: "wrap" }}>
            {item.name}
          </Text>
          {item.artist && <Text>{item.artist.name}</Text>}
        </View>
      </TouchableOpacity>
      <MaterialIcons
        name={shouldHighLight ? "music-note" : iconName}
        size={30}
        style={{ marginHorizontal: 7 }}
        color={"green"}
        onPress={() => secondaryAction(item)}
      />
    </View>
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
});
