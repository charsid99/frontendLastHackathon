import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, AccessibilityInfo } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import MainStackNavigator from "./navigation/AppNavigation";
import { Audio } from "expo-av";
import { localAuthenticate } from "./utils/nativeAuthUtils";
import * as Brightness from 'expo-brightness';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0018A8",
    accent: "#E57200",
    text: "#FFF",
    background: "#0018A8",
  },
};

export default function App() {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  const [isAssetReady, setIsAssetReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  let [fontsLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("./assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Italic": require("./assets/fonts/Lato-Italic.ttf"),
  });

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    const getPermissions = async () => {
      await Audio.requestPermissionsAsync();
      // const authenticated = await localAuthenticate();
      // setIsAuthenticated(authenticated);
    };

    getPermissions();
  }, []);
  function cacheImages(images) {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  async function _loadAssetsAsync() {
    //Specify all images here through require or links
    const imageAssets = cacheImages([]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  if(screenReaderEnabled)
  Brightness.setBrightnessAsync(0);
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        {/* Wrapper for React Native Elements */}
        <PaperProvider theme={theme}>
          {/* Wrapper for React Native Paper */}
          <View style={styles.container}>
            {isAuthenticated ? (
              <MainStackNavigator />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>
                  Cannot Authenticate
                </Text>
              </View>
            )}
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
