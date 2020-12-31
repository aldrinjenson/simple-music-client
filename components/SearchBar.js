import React, { useState } from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({ value, setValue, placeholder }) => {
  const [query, setQuery] = useState(value);

  const handleSubmit = () => {
    if (query) setValue(query);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={{ flexGrow: 1, marginLeft: 20 }}
        placeholder={placeholder}
        value={query}
        onKeyPress={(key) => (key.key === "Enter" ? handleSubmit() : null)}
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={handleSubmit}
      />

      <MaterialIcons
        name="search"
        size={25}
        onPress={handleSubmit}
        style={styles.icon}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 28,
    width: "95%",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },
  icon: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    paddingRight: 8,
  },
});
