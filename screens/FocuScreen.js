import React, { useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import colors from "../config/colors";
import Screen from "./Screen";
import ImageButton from "../components/ImageButton";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { customStyles4 } from "./styles/styles";
import VectorButton from "../components/VectorButton";
import GetArea from "../components/GetArea";

import { SomeFunction } from "../BackgroundScripts/SomeFunction"; // Import the function
import { AddData } from "../BackgroundScripts/AddData"; // Import the function

function FocuScreen({ navigation }) {
  const [focusValue, setFocusValue] = useState(0);

  const id = "-NgxNUSg4jhQHQx8tp7L";
  const email = "kk@gmail.com";
  const area = "23.45 cm ";
  const name = "Bamboosa a";
  const location = { latitude: 12.34, longitude: 23.4 };

  const item2 = {
    id: id,
    email: email,
    area: area,
    name: name,
    location: location,
  };

  const pressMore = () => {
    navigation.navigate("ReportScreen", { item2: item2 });
  };

  const pressBack = () => {
    navigation.navigate("ProecessImageScreen");
  };

  const incrementFocus = () => {
    if (focusValue < 255) {
      setFocusValue(Math.min(255, Math.round(focusValue + 1)));
    }
  };

  const decrementFocus = () => {
    if (focusValue > 0) {
      setFocusValue(Math.min(255, Math.round(focusValue - 1)));
    }
  };

  return (
    <Screen color={colors.color3}>
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <ImageButton
            image={require("../assets/back-to.png")}
            size={42}
            onPress={() => pressBack()}
          ></ImageButton>
          <View style={styles.area}>
            <AppText>Area</AppText>
            <View style={{ width: 1, height: 15, backgroundColor: "black" }} />
            <AppText>45.67 cm</AppText>
          </View>
          <AppButton
            title={"More"}
            style={{ paddingHorizontal: 20, marginLeft: 10 }}
            onPress={() => pressMore()}
          ></AppButton>
        </View>
        <View style={styles.middleContainer}>
          {/*get area <GetArea {focus}/> comes here use usesatate for synchronizing*/}
          <GetArea focus={100} />
        </View>
        <View style={styles.downContainer}>
          <AppText>Adjust to focus</AppText>

          <View style={styles.sliderView}>
            <Slider
              animateTransitions
              minimumTrackTintColor="#107500"
              thumbStyle={customStyles4.thumb}
              trackStyle={customStyles4.track}
              value={focusValue}
              minimumValue={0}
              maximumValue={255}
              onValueChange={(value) => setFocusValue(Math.round(value))}
              onSlidingComplete={(value) => setFocusValue(Math.round(value))}
            ></Slider>
          </View>

          <View style={styles.buttonView}>
            <VectorButton
              name="minus-box"
              size={40}
              onPress={decrementFocus}
            ></VectorButton>
            <View style={styles.foucusValue}>
              <AppText style={{ paddingHorizontal: 5 }}>{focusValue}</AppText>
            </View>
            <VectorButton
              name="plus-box"
              size={40}
              onPress={incrementFocus}
            ></VectorButton>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  upContainer: {
    flex: 0.15,
    backgroundColor: colors.color3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  area: {
    borderRadius: 30,
    backgroundColor: colors.colorTwo,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginLeft: 5,
    borderColor: "#e6e6e6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  middleContainer: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: colors.white,
  },

  downContainer: {
    flex: 0.25,
    backgroundColor: colors.color3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  sliderView: {
    width: "95%",
  },

  buttonView: {
    flexDirection: "row",
  },
});

export default FocuScreen;
