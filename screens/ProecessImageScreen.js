import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Screen from './Screen';
import colors from '../config/colors';
import VectorTextBtn from '../components/VectorTextBtn';
import { firebase } from '../config';

function ProecessImageScreen({ route, navigation }) {
  const { savedImage } = route.params;
  const currentUser = firebase.auth().currentUser;

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const userCollection = firebase.firestore().collection('users');
      const userDoc = userCollection.doc(currentUser.uid);

      await userDoc.update({
        imageUrl: imageUri,
      });

      console.log('Image URL updated in Firestore:', imageUri);
    } catch (error) {
      console.error('Error updating image URL in Firestore:', error);
    }
  }

  return (
    <Screen color={colors.color4}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: savedImage }}
          style={styles.imgContainer}
          resizeMode="contain" // This ensures that the image is displayed at its original size
        />
      </View>
      <View style={styles.downPart}>
        <VectorTextBtn
          name="camera-retake"
          size={40}
          title="camera-retake"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
          onPress={() => navigation.navigate('CameraScreen')}
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
          name="page-next"
          size={40}
          title="Next"
          textStyle={{ fontSize: 8, paddingVertical: 0 }}
          onPress={() => {
            uploadImageToFirebase(savedImage);
            // Additional navigation logic here
          }}
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
  downPart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.15,
    paddingHorizontal: 10,
  },
});

export default ProecessImageScreen;
