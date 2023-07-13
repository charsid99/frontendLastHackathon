import React from "react";
import { Text, View } from "react-native";
import Header from "../components/Header";

const AddQuickActionPage = ({ navigation }) => {
  return (
    <>
      <Header title="AddQuickActionPage" navigation={navigation} />
      <View>
        <Text style={{ fontFamily: "Lato-Bold", fontSize: 40 }}>
          Add QuickAction Page
        </Text>
      </View>
    </>
  );
};

export default AddQuickActionPage;
