import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';

import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import Screen from "./Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

const LogInScreen =()=> {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error){
      alert(error.message)
    }
  }


  return (
    <Screen color={colors.color4}>
      <View style={styles.container}>
        <View style={{ width: 400, height: 200 }}>
          <LottieView
            autoPlay={true}
            source={require("../assets/anime.json")}
            style={{
              width: 200,
              margin: -5,
              height: 400,
              alignSelf: "center",
            }}
          ></LottieView>
        </View>

        <View style={styles.container2}>
          <AppText style={styles.title}>Log In</AppText>
          <AppTextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            autoCorrect = {false}
            placeholder="Email"
          />

          <AppTextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            autoCorrect = {false}
            placeholder="Password"
          />

          <AppButton
            title="Login"
            style={styles.signBtn}
            onPress={() => loginUser(email, password)}
          ></AppButton>
          <View style={styles.goToLoginContainer}>
            <AppText style={styles.goToLoginText}>
              Don't have an account?
            </AppText>
            <TouchableOpacity style={styles.goToLogin} onPress={()=> navigation.navigate("SignUpScreen")} ><Text style={{color:'#178517',textDecorationLine: "underline", fontWeight:"bold"}}> Register</Text></TouchableOpacity>
          </View>
        </View>

        {/* add google sign in button here. */}

        <Image
          source={require("../assets/ellipse4.png")}
          style={styles.img}
        ></Image>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.color, flex: 1 },
  container2: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 40,
  },

  title: {
    fontSize: 30,
    marginBottom: 30,
    alignSelf: "flex-start",
    // marginLeft: 20,
  },

  subtitle: {
    alignSelf: "flex-start",
    marginLeft: 15,
    paddingVertical: 5,
    color: colors.gray1,
  },

  goToLoginContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  goToLoginText: {
    color: colors.gray1,
  },

  goToLogin: {
    textDecorationLine: "underline",
    color: colors.colorGreen,
  },

  img: {
    flex: 1,
    zIndex: -1,
    position: "absolute",

    marginTop: 600,
  },
  text: {
    fontSize: 32,
  },
  signBtn: {
    paddingVertical: 11,
    width: "100%",
  },

  input: {
    marginBottom: 70,
  },
});

export default LogInScreen;
