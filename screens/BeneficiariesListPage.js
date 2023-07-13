import React from "react";
import { Text, View } from "react-native";
import Header from "../components/Header";

const BeneficiariesListPage = ({ navigation }) => {
  return (
    <>
      <Header title="BeneficiariesListPage" navigation={navigation} />
      <View>
        <Text style={{ fontFamily: "Lato-Bold", fontSize: 40 }}>
          Beneficiaries List Page
        </Text>
      </View>
    </>
  );
};

export default BeneficiariesListPage;
