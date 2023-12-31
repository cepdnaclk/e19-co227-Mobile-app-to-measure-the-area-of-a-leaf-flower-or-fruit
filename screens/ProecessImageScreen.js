import React from "react";

import { View, StyleSheet } from "react-native";

import Screen from "./Screen";
import colors from "../config/colors";
import VectorTextBtn from "../components/VectorTextBtn";

function ProecessImageScreen(props) {
  return (
    <Screen color={colors.color4}>
      <View style={styles.container}>
        <View style={styles.imgContainer}></View>
      </View>
      <View style={styles.downPart}>
        <VectorTextBtn
          name="reload"
          size={40}
          title="Retake"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
        />
        <VectorTextBtn
          name="rotate-right"
          size={40}
          title="Rotate right"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
        />
        <VectorTextBtn
          name="rotate-left"
          size={40}
          title="Rotate left"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
        />
        <VectorTextBtn
          name="page-next-outline"
          size={40}
          title="Next"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color4,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: colors.color3,
  },

  btn: {
    padding: 10,
    borderRadius: 15,
  },

  downPart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.15,
    paddingHorizontal: 10,
  },
});

export default ProecessImageScreen;
