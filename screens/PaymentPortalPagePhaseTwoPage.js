import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { withTheme } from "react-native-paper";
import { Button, Input } from "react-native-elements";
import GeneralCard from "../components/GeneralCard";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import FormStepperProgressBar from "../components/FormStepperProgressBar";
import paymentFormSteps from "../constants/paymentFormSteps";
import * as Haptics from "expo-haptics";
import { getAllBeneficiaries } from "../constants/URI";
import { getData } from "../utils/storageUtils";
const PaymentPortalPagePhaseTwo = ({ route, theme, navigation }) => {
  const { amount, method } = route.params;
  const [beneficiaries, setBeneficiaries] = useState([
    { beneficiaryName: "eshwar", beneficiaryId: "eshwar" },
  ]);
  const [beneficiary, setBeneficiary] = useState("");
  const [isAccountNumberHighlited, setIsAccountNumberHighlited] = useState(
    false
  );
  const [isAmountHighlited, setIsAmountHighlited] = useState(false);
  const [isIFSCHigh, setIsIFSCHigh] = useState(false);
  const [accountNumber, setAccountNumber] = useState(0);
  const [ifscCode, setIfscCode] = useState(0);
  const [confirmationAmount, setConfirmationAmount] = useState(0);
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    const getAllBens = async () => {
      const userId = await getData("userId");
      console.log(userId);
      const response = await getAllBeneficiaries(userId);
      console.log(response);
      setBeneficiaries(response);
      console.log(response);
    };
    getAllBens();
  }, []);

  const fillBeneficiaries = () => {
    return beneficiaries.map((item) => {
      return <Picker.Item label={item.BENF_NAME} value={item.USER_ID} key={item.USER_ID} />;
    });
  };

  const fillTheAppropriateFields = () => {
    if (method == "friend") {
      return (
        <>
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
                Payee
              </Text>
            </View>
            <Picker
              selectedValue={beneficiary}
              style={{ height: 50, width: 300 }}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                setBeneficiary(beneficiaries[itemIndex].BENF_NAME);
              }}
            >
              {beneficiaries.length > 1 ? (
                fillBeneficiaries()
              ) : (
                <Picker.Item label={"eshwar"} value={"userId"} />
              )}
            </Picker>
          </View>
        </>
      );
    } else if (method == "account") {
      return (
        <>
          <View
            style={{
              marginTop: 40,
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 30,
            }}
          >
            <Input
              leftIconContainerStyle={{ marginRight: 5 }}
              label="Account Number"
              placeholder="Enter Account Number"
              errorStyle={{
                color: "red",
                fontFamily: "Lato-Italic",
                marginBottom: 30,
              }}
              leftIcon={{ type: "material", name: "payment" }}
              inputStyle={{ fontFamily: "Lato-Regular" }}
              onChangeText={(value) => setAccountNumber(value)}
              labelStyle={{
                color: theme.colors.primary,
                fontFamily: "Lato-Bold",
                fontWeight: "normal",
              }}
              inputContainerStyle={{
                borderColor: isAccountNumberHighlited
                  ? theme.colors.primary
                  : "#000",
              }}
              onTouchStart={(e) => {
                setIsAccountNumberHighlited(true);
              }}
              onBlur={() => {
                setIsAccountNumberHighlited(false);
              }}
            />
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
              leftIconContainerStyle={{ marginRight: 5 }}
              label="IFSC Code"
              placeholder="Enter IFSC Code"
              errorStyle={{
                color: "red",
                fontFamily: "Lato-Italic",
                marginBottom: 30,
              }}
              leftIcon={{ type: "material", name: "payment" }}
              inputStyle={{ fontFamily: "Lato-Regular" }}
              onChangeText={(value) => setIfscCode(value)}
              labelStyle={{
                color: theme.colors.primary,
                fontFamily: "Lato-Bold",
                fontWeight: "normal",
              }}
              inputContainerStyle={{
                borderColor: isIFSCHigh ? theme.colors.primary : "#000",
              }}
              onTouchStart={(e) => {
                setIsIFSCHigh(true);
              }}
              onBlur={() => {
                setIsIFSCHigh(false);
              }}
            />
          </View>
        </>
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontFamily: "Lato-Bold" }}>
          Payment of <Text>{amount}</Text> To
        </Text>
      </View>
      {fillTheAppropriateFields()}
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
          label="Amount Confirmation"
          placeholder="Enter Amount Again"
          errorStyle={{
            color: "red",
            fontFamily: "Lato-Italic",
            marginBottom: 30,
          }}
          leftIcon={{ type: "material", name: "payment" }}
          inputStyle={{ fontFamily: "Lato-Regular" }}
          onChangeText={(value) => {
            setConfirmationAmount(value);
          }}
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
      <View style={{ marginBottom: 10, marginTop: 30 }}>
        <Button
          title="Next"
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 50,
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            if (amount != confirmationAmount) {
              setAmountError("Amount does not match");
              return;
            } else {
              if (method == "friend") {
                navigation.navigate("PaymentPortalPagePhaseThree", {
                  method: method,
                  amount: amount,
                  beneficiary: beneficiary,
                });
              } else if (method == "upi") {
                navigation.navigate("PaymentPortalPagePhaseThree", {
                  method: method,
                  amount: amount,
                });
              } else if (method == "account") {
                navigation.navigate("PaymentPortalPagePhaseThree", {
                  method: method,
                  amount: amount,
                  accountNumber: accountNumber,
                  ifscCode: ifscCode,
                });
              }
            }
          }}
        />
      </View>
    </View>
  );
};

const PaymentPortalPagePhaseTwoPage = ({ navigation, theme, route }) => {
  return (
    <>
      <Header title="PaymentPortalPage" navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GeneralCard
          contents={
            <PaymentPortalPagePhaseTwo
              route={route}
              theme={theme}
              navigation={navigation}
            />
          }
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormStepperProgressBar
          navigation={navigation}
          theme={theme}
          labels={paymentFormSteps}
          currentPosition={1}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default withTheme(PaymentPortalPagePhaseTwoPage);
