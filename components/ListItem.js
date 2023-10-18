import React from "react";

import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function ListItem({ firstName, id, imageUrl, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUrl }}></Image>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{firstName}</AppText>
          <AppText style={styles.subtitle}>{id}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  textContainer: {
    paddingHorizontal: 20,
  },

  subtitle: {
    color: colors.gray,
    paddingVertical: 4,
  },

  title: {
    paddingVertical: 4,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ListItem;
