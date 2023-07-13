import React from "react";
import { ImageBackground } from "react-native";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import { Divider, withTheme } from "react-native-paper";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    elevation: 2,
    padding: 20,
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
  },
  cardContent: {
    fontFamily: "Lato-Regular",
  },
});

const NewsCard = ({ data }) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardTitle}>{data.title}</Text>
      <Text style={styles.cardContent}>{data.content}</Text>
    </View>
  );
};
export default withTheme(NewsCard);
