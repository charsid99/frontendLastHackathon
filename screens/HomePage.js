import React, { useState, useEffect, useRef } from "react";
import { Text, View, Animated, AccessibilityInfo } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withTheme } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { getData } from "../utils/storageUtils";
import { localAuthenticate } from "../utils/nativeAuthUtils";
import * as Brightness from 'expo-brightness';

const HomePage = ({ theme, navigation }) => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isInAccessibleSelectMode, setIsInAccessibleSelectMode] = useState(
    false
  );
  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const [checkBoxes, setCheckBoxes] = useState({
    blind: false,
    partialBlind: false,
    deaf: false,
    partialDeaf: false,
  });

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnimation]);

  if(screenReaderEnabled)
  Brightness.setBrightnessAsync(0);
  
  return (
    <View style={{ flex: 1 }}>
      <Header isLoggedIn={true} title="Deutsche Bank" navigation={navigation} />

      <View
        style={{
          flex: 1,
          marginBottom: 10,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Animated.View style={{ margin: 15, opacity: fadeInAnimation }}>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 30,
              textAlign: "center",
              color: theme.colors.primary,
            }}
          >
            dbMbrace
          </Text>
          <Text
            style={{
              fontFamily: "Lato-Italic",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Building ramps in the world of stairs
          </Text>
        </Animated.View>
        <View
          style={{
            display: !isInAccessibleSelectMode ? "flex" : "none",
          }}
        >
          <Button
            icon={
              <Icon name="person" type="material" size={30} color="white" />
            }
            containerStyle={{ padding: 10 }}
            buttonStyle={{ backgroundColor: theme.colors.primary, padding: 10 }}
            titleStyle={{
              fontSize: 21,
              marginLeft: 10,
              fontFamily: "Lato-Bold",
            }}
            title="Login"
            onPress={async () => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

              let isBiometric = await getData("biometric");
              console.log(isBiometric);
              isBiometric = isBiometric === "yes";
              if (isBiometric) {
                const authenticated = await localAuthenticate();
                if (authenticated) {
                  return navigation.navigate("AuthenticatedHomePage");
                }
              }
              navigation.navigate("Login");
            }}
          />
          <Button
            icon={
              <Icon
                name="accessible-forward"
                type="material"
                size={30}
                color="white"
              />
            }
            containerStyle={{ padding: 10 }}
            buttonStyle={{ backgroundColor: theme.colors.primary, padding: 10 }}
            titleStyle={{
              fontSize: 21,
              marginLeft: 10,
              fontFamily: "Lato-Bold",
            }}
            title="Accessibility Setup"
          />
        </View>
        <View style={{ display: isInAccessibleSelectMode ? "flex" : "none" }}>
          <CheckBox
            center
            title="I cannot see"
            checked={checkBoxes.blind}
            checkedColor="green"
            onPress={() => {
              setCheckBoxes({ ...checkBoxes, blind: !checkBoxes.blind });
            }}
          />
          <CheckBox
            center
            title="I cannot hear"
            checked={checkBoxes.deaf}
            checkedColor="green"
            onPress={() => {
              setCheckBoxes({
                ...checkBoxes,
                deaf: !checkBoxes.deaf,
              });
            }}
          />
          <CheckBox
            center
            title="I have hearing problems"
            checked={checkBoxes.partialDeaf}
            onPress={() => {
              setCheckBoxes({
                ...checkBoxes,
                partialDeaf: !checkBoxes.partialDeaf,
              });
            }}
            checkedColor="green"
          />
        </View>
      </View>
    </View>
  );
};

export default withTheme(HomePage);
