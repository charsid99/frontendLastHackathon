import React, { useState, useRef, useEffect } from "react";
import { Text, View, Animated } from "react-native";
import { Button, Input } from "react-native-elements";
import Header from "../components/Header";
import { withTheme } from "react-native-paper";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const LoginPage = ({ theme, navigation }) => {
  const [userId, setUserId] = useState("");
  const [isLoginHighlited, setIsLoginHighlited] = useState(false);
  const [userIdErrorMessage, setUserIdErrorMessage] = useState("");
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
  const handleLoginSubmit = () => {
    let isError = false;
    if (userId.length < 5) {
      isError = true;
      setUserIdErrorMessage("Invalid User ID");
    }
    if (isError) {
      return;
    }

    setTimeout(() => {
      navigation.navigate("Password", { userId: userId });
    });
  };

  return (
    <>
      <Header title="Login" navigation={navigation} />
      <View
        accessibilityLabel="User ID Form"
        accessibilityHint="PLease enter your User ID and press proceed"
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
            keyboardType="number-pad"
            leftIconContainerStyle={{ marginRight: 5 }}
            label="User ID"
            placeholder="Your ID or Mobile Number"
            errorStyle={{
              color: "red",
              fontFamily: "Lato-Italic",
              marginBottom: 30,
            }}
            errorMessage={userIdErrorMessage}
            leftIcon={{ type: "material", name: "person" }}
            inputStyle={{ fontFamily: "Lato-Regular" }}
            onChangeText={(value) => setUserId(value)}
            labelStyle={{
              color: theme.colors.primary,
              fontFamily: "Lato-Bold",
              fontWeight: "normal",
            }}
            inputContainerStyle={{
              borderColor: isLoginHighlited ? theme.colors.primary : "#000",
            }}
            onTouchStart={(e) => {
              setIsLoginHighlited(true);
            }}
            onBlur={() => {
              setIsLoginHighlited(false);
            }}
          />
          <Button
            title="Proceed"
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 50,
            }}
            onPress={handleLoginSubmit}
          />

          <TouchableOpacity
            accessibilityLabel="Forgot Password?"
            accessibilityHint="Connects to bank customer care for password resolution"
            containerStyle={{ margin: 25, padding: 0 }}
          >
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

export default withTheme(LoginPage);
