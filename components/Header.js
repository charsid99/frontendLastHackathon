import React from "react";
import { Icon } from "react-native-elements";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header as AppBar } from "react-native-elements";
import { withTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import { clearData } from "../utils/storageUtils";
const Header = ({ isLoggedIn, theme, navigation, route, title }) => {
  const { colors } = theme;
  const iconNames = {
    login: "arrow-back-ios",
    "deutsche bank": "menu",
    news: "menu",
  };
  const handleLeftIconPress = (e) => {
    if (iconNames[title.toLowerCase()] === "arrow-back-ios") {
      navigation.goBack();
      return;
    } else if (iconNames[title.toLowerCase()] === "menu") {
      navigation.openDrawer();
      return;
    } else {
      navigation.goBack();
    }
  };
  return (
    <View>
      <AppBar
        statusBarProps={{ backgroundColor: theme.colors.primary }}
        containerStyle={{
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 18,
        }}
        leftComponent={
          <Icon
            accessibilityLabel="Back button"
            accessibilityHint="takes you to previous screen"
            name={
              iconNames[title.toLowerCase()]
                ? iconNames[title.toLowerCase()]
                : "arrow-back-ios"
            }
            type="material"
            color="#fff"
            iconStyle={{ fontSize: 35 }}
            onPress={handleLeftIconPress}
          />
        }
        centerContainerStyle={{ margin: 0, padding: 0, top: 0 }}
        centerComponent={
          <View style={{ flex: 1, top: 0 }}>
            {/* <Image
              importantForAccessibility="no"
              style={{ width: 130, height: 65 }}
              source={require("../assets/images/horizontalwhitelogo.png")}
            /> */}
            <Text
              style={{
                color: "#FFF",
                fontFamily: "Lato-Bold",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Deutsche Bank
            </Text>
          </View>
        }
        rightComponent={
          // <Icon
          //   iconStyle={{ fontSize: 35 }}
          //   name="accessible-forward"
          //   type="material"
          //   color="#fff"
          //   onPress={() => console.log("hello")}
          // />
          <Icon
            iconStyle={{ fontSize: 35 }}
            name="logout"
            type="material"
            color="#fff"
            onPress={() => {
              clearData();
              navigation.navigate("Home");
            }}
          />
        }
      />
    </View>
  );
};
export default withTheme(Header);
