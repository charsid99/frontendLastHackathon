import { withTheme } from "react-native-paper";
import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

const ITEM_WIDTH = Math.round(Dimensions.get("window").width * 0.9);
const ITEM_HEIGHT = Dimensions.get("window").height * 0.6;

const GeneralCard = ({ contents, width, height }) => {
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      width: width || ITEM_WIDTH,
      maxHeight: height || ITEM_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      shadowColor: "black",
      elevation: 10,
    },
  });

  return <View style={styles.itemContainer}>{contents}</View>;
};

export default withTheme(GeneralCard);
