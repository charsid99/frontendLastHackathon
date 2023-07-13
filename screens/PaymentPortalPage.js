import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Keyboard } from "react-native";
import { withTheme } from "react-native-paper";
import { Button, Input } from "react-native-elements";
import GeneralCard from "../components/GeneralCard";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import FormStepperProgressBar from "../components/FormStepperProgressBar";
import * as Haptics from "expo-haptics";
import paymentFormSteps from "../constants/paymentFormSteps";

const PaymentPortalPage = ({ navigation, theme }) => {
  const PaymentPortalPhaseOne = () => {
    const [amount, setAmount] = useState(0);

    const [isAmountHighlited, setIsAmountHighlited] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("account");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontFamily: "Lato-Bold" }}>
            Payment Info
          </Text>
        </View>
        <View
          style={{
            marginTop: 70,

            justifyContent: "center",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View style={{ paddingLeft: 5 }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Lato-Bold",
                color: theme.colors.primary,
              }}
            >
              Payment Method
            </Text>
          </View>
          <Picker
            selectedValue={paymentMethod}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) =>
              setPaymentMethod(itemValue)
            }
          >
            <Picker.Item label="UPI" value="upi" />
            <Picker.Item label="Beneficiary" value="friend" />
            <Picker.Item label="Account" value="account" />
          </Picker>
        </View>

        <View
          style={{
            marginTop: 40,
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 30,
          }}
        >
          <Input
            keyboardType="number-pad"
            leftIconContainerStyle={{ marginRight: 5 }}
            label="Amount"
            placeholder="Enter Amount"
            errorStyle={{
              color: "red",
              fontFamily: "Lato-Italic",
              marginBottom: 30,
            }}
            leftIcon={{ type: "material", name: "payment" }}
            inputStyle={{ fontFamily: "Lato-Regular" }}
            onChangeText={(value) => setAmount(value)}
            labelStyle={{
              color: theme.colors.primary,
              fontFamily: "Lato-Bold",
              fontWeight: "normal",
            }}
            inputContainerStyle={{
              borderColor: isAmountHighlited ? theme.colors.primary : "#000",
            }}
            onTouchStart={(e) => {
              setIsAmountHighlited(true);
            }}
            onBlur={() => {
              setIsAmountHighlited(false);
            }}
          />
        </View>
        <View style={{ marginBottom: 60 }}>
          <Button
            title="Next"
            titleStyle={{ fontSize: 20 }}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 50,
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              navigation.navigate("PaymentPortalPagePhaseTwo", {
                method: paymentMethod,
                amount: amount,
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
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <GeneralCard contents={<PaymentPortalPhaseOne />} />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormStepperProgressBar
          navigation={navigation}
          theme={theme}
          labels={paymentFormSteps}
          currentPosition={0}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default withTheme(PaymentPortalPage);
