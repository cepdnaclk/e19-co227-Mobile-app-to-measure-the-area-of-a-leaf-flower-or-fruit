import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'; 

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                marginTop:20,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => {
          
          navigation.navigate("LoginScreen"); // Navigate to LoginScreen
        }}
        onDone={() => {
          
          navigation.navigate("LoginScreen"); // Navigate to LoginScreen
        }}
        pages={[
          
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../docs/images/paper.png')} style={{ width: 200, height: 200 }}/>,
            title: 'Placing the leaf',
            subtitle: ' Place the leaf on top of the A4 paper then keep the transparent board on the top of the leaf.',
          },
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../docs/images/camera.png')} style={{ width: 200, height: 200 }}/>,
            title: 'Take a picture',
            subtitle: "Take a picture ensuring the entire A4 paper is visible in the frame.",
          },
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../docs/images/time.png')} style={{ width: 200, height: 200 }}/>,
            title: 'Save your time',
            subtitle: "With just on click measure the area of the leaf with more details.",
          },
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../docs/images/report.png')} style={{ width: 250, height: 250 }}/>,
            title: 'See previous observations',
            subtitle: "You can observe the previous stored observations.",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
})