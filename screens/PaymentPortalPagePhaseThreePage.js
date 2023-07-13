import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { withTheme } from "react-native-paper";
import { Button, Input } from "react-native-elements";
import GeneralCard from "../components/GeneralCard";
import Header from "../components/Header";
import paymentFormSteps from "../constants/paymentFormSteps";
import * as Haptics from "expo-haptics";
import FormStepperProgressBar from "../components/FormStepperProgressBar";
// {YYYY-MM-DD}
const PaymentPortalPagePhaseThreePage = ({ navigation, theme, route }) => {
  const { amount, method, beneficiary, ifscCode, accountNumber } = route.params;
  const fillTheAppropriateConfirmation = () => {
    if (ifscCode && accountNumber) {
      return (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Lato-Bold",
              textAlign: "center",
            }}
          >
            You are about to pay {accountNumber} with {" \n "}
            <Text style={{ color: "red", fontSize: 26 }}>
              rupees {amount}
            </Text>, {" \n "}
            please confirm the action by pressing the{" "}
            <Text style={{ color: theme.colors.primary }}>
              "Confirm Payment"
            </Text>
            Button
          </Text>
        </View>
      );
    } else if (beneficiary) {
      return (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Lato-Bold",
              textAlign: "center",
            }}
          >
            You are about to pay {beneficiary} with {" \n "}
            <Text style={{ color: "red", fontSize: 26 }}>rupees {amount}</Text>,
            {" \n "}
            please confirm the action by pressing the{" "}
            <Text style={{ color: theme.colors.primary }}>
              "Confirm Payment"
            </Text>
            Button
          </Text>
        </View>
      );
    }
  };
  const PaymentPortalPagePhaseThree = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Text style={{ fontSize: 24, fontFamily: "Lato-Bold" }}>
            Confirm Details
          </Text>
        </View>
        {fillTheAppropriateConfirmation()}
        <View style={{ marginBottom: 10, marginTop: 50 }}>
          <Button
            title="CONFIRM PAYMENT"
            titleStyle={{ fontSize: 20 }}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 50,
            }}
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("PaymentPortalPagePhaseFour", {
                method: method,
                amount: amount,
                accountNumber: accountNumber,
                ifscCode: ifscCode,
                beneficiary: beneficiary,
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Header title="PaymentPortalPage" navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GeneralCard contents={<PaymentPortalPagePhaseThree />} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormStepperProgressBar
          navigation={navigation}
          theme={theme}
          labels={paymentFormSteps}
          currentPosition={2}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default withTheme(PaymentPortalPagePhaseThreePage);
