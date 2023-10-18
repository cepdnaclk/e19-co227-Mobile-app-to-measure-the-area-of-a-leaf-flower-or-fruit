import React, { useState } from "react";
import LottieView from "lottie-react-native";
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
import validator from 'validator'; 

function SignUpScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  // passwords and usernames set to this variables- 
  // sudusini, implement sign in part using your functions

  registerUser = async (email, password, userName) => {
    if (!validator.isEmail(email)) {
      alert('Invalid email format');
      return;
    }

    if (password !== reenteredPassword) {
      // Passwords don't match
      setPasswordsMatch(false);
      return;
    }
    
    try {
      // Attempt to create the user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      // Check if email verification is required
      const currentUser = firebase.auth().currentUser;
      if (currentUser && !currentUser.emailVerified) {
        await currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://agrocam-7d76f.firebaseapp.com',
        });
        alert('Verification email sent. Please verify your email address.');
      } else {
        alert('Account created successfully.');
      }
      
      // Save user data to Firestore
      await firebase.firestore().collection('users').doc(currentUser.uid).set({
        userName,
        email,
      });
  
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please choose a different email.');
      } else {
        alert(error.message);
      }
    }
  };
  


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
          <AppText style={styles.title}>Register Here!!</AppText>
          <AppTextInput
            style={styles.input}
            placeholder="User Name"
            onChangeText={(userName) => 
              setUserName(userName)}
            autoCorrect = {false}
          />
          

          <AppTextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCorrect = {false}
          />

          <AppTextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCorrect = {false}
            secureTextEntry={true}
          />

          <AppTextInput
            style={styles.input}
            placeholder="Re-enter Password"
            onChangeText={(reenteredPassword) => setReenteredPassword(reenteredPassword)}
            autoCorrect={false}
            secureTextEntry={true} // Hide re-enter password input
          />

          {passwordsMatch ? null : (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}
          

          <AppButton
            title="Register"
            style={styles.signBtn}
            onPress={() => registerUser(email,password, userName)}
          ></AppButton>
          <View style={styles.goToLoginContainer}>
            <AppText style={styles.goToLoginText}>Have an account? </AppText>
            <TouchableOpacity style={styles.goToLogin} onPress={()=> navigation.navigate("LoginScreen")} ><Text style={{color:'#178517',textDecorationLine: "underline", fontWeight:"bold"}}> Log In</Text></TouchableOpacity>
          </View>
        </View>

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

export default SignUpScreen;
