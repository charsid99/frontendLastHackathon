import React from "react";
import { Text, View } from "react-native";
import Header from "../components/Header";

const AddBeneficiaryPage = ({ navigation }) => {
  <Header title="AddBeneficiaryPage" navigation={navigation} />;
  return (
    <View>
      <Text style={{ fontFamily: "Lato-Bold", fontSize: 40 }}>
        Add Beneficiary Page
      </Text>
    </View>
  );
};

export default AddBeneficiaryPage;
