import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config'
import {windowWidth} from '../components/Dimetions'


import Screen from "./Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import LottieView from "lottie-react-native";

const Dashboard = ({navigation}) => {

    const [name, setName] = useState('')

    useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
        firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const userData = snapshot.data();
                    console.log('User Data:', userData);
                    setName(userData.userName); // Note: It should be 'firstName' not 'firstname'
                } else {
                    console.log('User does not exist.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        console.log('No user is authenticated');
    }
}, []);


    return (
        <SafeAreaView>
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
        </View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop:100, alignItems:'center',marginLeft:10 }}>
                Hello, {name}
            </Text>

            <AppButton
                title="Sign Out"
                style={styles.signBtn}
                onPress={() => firebase.auth().signOut()}
            ></AppButton>

            <AppButton
                title="Next"
                style={styles.signBtn}
                onPress={() => navigation.navigate('CameraScreen')}
            ></AppButton>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    signBtn: {
        paddingVertical: 11,
        marginLeft:100,
        width: windowWidth-200,
        marginTop:100,
    },
})
