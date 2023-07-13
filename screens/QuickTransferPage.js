import React from "react";
import { Text, View } from "react-native";
import Header from "../components/Header";

const QuickTransferPage = ({ navigation }) => {
  return (
    <>
      <Header title="QuickTransferPage" navigation={navigation} />
      <View>
        <Text style={{ fontFamily: "Lato-Bold", fontSize: 40 }}>
          Quick Transfer Page
        </Text>
      </View>
    </>
  );
};

export default QuickTransferPage;
