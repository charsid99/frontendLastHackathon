import React, { useState, useRef, useEffect } from "react";
import { Text, View, Animated, AccessibilityInfo } from "react-native";
import { Button, Input } from "react-native-elements";
import Header from "../components/Header";
import { withTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { login } from "../constants/URI";
import storeData from "../utils/storageUtils";
import * as Speech from "expo-speech";
const PasswordPage = ({ theme, navigation, route }) => {
  const { userId } = route.params;
  const [isPasswordHighlited, setIsPasswordHighlted] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const WIND_WIDTH = Dimensions.get("window").width;
  const slideInAnimation = useRef(new Animated.Value(WIND_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideInAnimation, {
      toValue: 0,
      duration: 700,

      useNativeDriver: true,
    }).start();
  }, [slideInAnimation]);

  const handlePassword = (value) => {
    setPasswordErrorMessage("");
    setPassword(value);
  };
  const handleLoginSubmit = async () => {
    let isError = false;
    if (password.length < 5) {
      isError = true;
      setPasswordErrorMessage("Invalid Password");
    }
    if (isError) {
      return;
    }
    //TODO DEAL WITH THE PASSWORD
    setIsLoading(true);
    const response = await login(userId, password);
    if (response.USER_ID) {
      storeData("userId", response.USER_ID);
      setTimeout(() => {
        navigation.navigate("Biometric", 1000);
     
      });
    } else {
      setPasswordErrorMessage("Invalid password or user id");
      Speech.speak("Invalid password or user id")
     
    }
  };

  return (
    <>
      <Header title="Login" navigation={navigation} />
      <View
        accessibilityLabel="Password Form for Login"
        accessibilityHint="PLease enter your Password and press login"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Animated.View
          style={{
            justifyContent: "center",
            backgroundColor: "#FFF",
            elevation: 5,
            borderRadius: 10,
            alignItems: "center",
            margin: 20,
            padding: 30,
            transform: [{ translateX: slideInAnimation }],
          }}
        >
          <Input
            accessibilityLabel="Password Input "
            leftIconContainerStyle={{ marginRight: 5 }}
            label="Password"
            placeholder="Your Password"
            errorStyle={{
              color: "red",
              fontFamily: "Lato-Italic",
              marginBottom: 30,
            }}
            labelStyle={{
              color: theme.colors.primary,
              fontFamily: "Lato-Bold",
              fontWeight: "normal",
            }}
            inputStyle={{ fontFamily: "Lato-Regular" }}
            errorMessage={passwordErrorMessage}
            leftIcon={{ type: "material", name: "vpn-key" }}
            secureTextEntry={true}
            onChangeText={(value) => handlePassword(value)}
            inputContainerStyle={{
              borderColor: isPasswordHighlited ? theme.colors.primary : "#000",
            }}
            onTouchStart={(e) => {
              setIsPasswordHighlted(true);
            }}
            onBlur={() => {
              setIsPasswordHighlted(false);
            }}
          />
          <Button
            title="Login"
            accessibilityLabel="Login button"
            loading={isLoading}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 50,
            }}
            onPress={handleLoginSubmit}
          />

          <TouchableOpacity containerStyle={{ margin: 25, padding: 0 }}>
            <Text>
              Forgot Password?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Contact Support
              </Text>{" "}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

export default withTheme(PasswordPage);
