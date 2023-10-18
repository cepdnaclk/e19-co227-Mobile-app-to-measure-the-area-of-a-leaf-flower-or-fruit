import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../components/Dimetions";
import colors from "../config/colors";
import ImageButton from "../components/ImageButton";
import VectorButton from "../components/VectorButton";
import Screen from "./Screen";
import VectorTextBtn from "../components/VectorTextBtn";

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const cameraRef = useRef(null);

    const checkPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
    setGalleryPermission(galleryStatus.status === "granted");
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false);
        setImage(null);
      };
    }, [])
  );

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
  
        // Pass the captured image URI as a parameter when navigating to ProecessImageScreen
        navigation.navigate('ProecessImageScreen', { savedImage: data.uri });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImage = async () => {
    if (galleryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Access the selected assets from the 'assets' array
        const selectedAsset = result.assets[0]; // Assuming you want the first selected asset
        const imageUri = selectedAsset.uri; // Use 'uri' from the selected asset
  
        // Pass the selected image URI as a parameter when navigating to ProecessImageScreen
        navigation.navigate('ProecessImageScreen', { savedImage: imageUri });
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        //alert('Picture saved!');
        setImage(null);
        navigation.navigate("ProecessImageScreen", { savedImage: image });
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      
        <Screen color="black">
          <View style={styles.container}>
            {isCameraActive && hasCameraPermission && (
              <Camera
                ref={cameraRef}
                style={{
                  width: windowWidth,
                  height: windowHeight - 150,
                  marginTop: -75,
                }}
                type={cameraType}
              />
            )}
            <View style={styles.menu}>
              <VectorButton
                name="history"
                color="white"
                size={40}
                style={{ padding: 15 }}
                onPress={() => navigation.navigate("HistoryScreen")}
              ></VectorButton>
              <VectorButton
                name="image-outline"
                color="white"
                size={40}
                style={{ padding: 10 }}
                onPress={pickImage}
                disabled={!galleryPermission}
              ></VectorButton>
              <ImageButton
                image={require("../assets/AgroCam.png")}
                size={70}
                style={{ padding: 15 }}
                onPress={takePicture}
                disabled={!hasCameraPermission}
              ></ImageButton>
              <VectorButton
                name="account-settings-outline"
                color="white"
                size={40}
                style={{ padding: 15 }}
              ></VectorButton>
              <VectorButton
                name="camera-flip-outline"
                color="white"
                size={40}
                style={{ padding: 15 }}
                onPress={toggleCameraType}
              ></VectorButton>
            </View>
          </View>
        </Screen>
        </View>
      
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.black, paddingTop: 50, flex: 1 },
  camera: {
    borderWidth: 150,
    flex: 1,
    margin: 6,
  },
  flash: {
    paddingTop: 88,
  },
  menu: {
    backgroundColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
  },
});
