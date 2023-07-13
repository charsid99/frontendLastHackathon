import React, { useState, useRef, useEffect } from "react";
import { Text, View, Animated, KeyboardAvoidingView } from "react-native";
import { Icon } from "react-native-elements";
import { withTheme } from "react-native-paper";
import { Button, Input } from "react-native-elements";
import GeneralCard from "../components/GeneralCard";
import Header from "../components/Header";
import * as Haptics from "expo-haptics";
import FormStepperProgressBar from "../components/FormStepperProgressBar";
import paymentFormSteps from "../constants/paymentFormSteps";
import { localAuthenticate } from "../utils/nativeAuthUtils";
import { payViaAccountNumber, payViaBeneficiary } from "../constants/URI";
import { getData } from "../utils/storageUtils";

const PaymentPortalPagePhaseFourPage = ({ navigation, theme, route }) => {
  const { amount, method, beneficiary, ifscCode, accountNumber } = route.params;
  isBiometricEnabled = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      if (isBiometricEnabled) {
        const authenticated = await localAuthenticate("Please Authenticate To Pay");
        setIsAuthenticated(authenticated);
        if (authenticated) {
          if (beneficiary) {
            const userId = await getData("userId");
            const response = await payViaBeneficiary(
              userId,
              beneficiary,
              amount,
              ""+19,
              ""+19,
              "Bill Payment"
            );

            if (response) {
              console.log(response)
            } else {
            }
          } else if (accountNumber) {
            const userId = await getData("userId");
            const response = await payViaAccountNumber(
              userId,
              accountNumber,
              amount,
              19,
              19,
              "Bill Payment"
            );

            if (response.data) {
            } else {
            }
          }
        }
      }
    };

    authenticate();
  }, []);

  const PaymentPortalPagePhaseFour = () => {
    const rotateAnim = useRef(new Animated.Value(100)).current;
    useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 700,

        useNativeDriver: true,
      }).start();
    }, [rotateAnim]);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontFamily: "Lato-Bold" }}>
            Transaction Status
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Icon
            iconStyle={{
              fontSize: 200,
            }}
            name="add-task"
            type="MaterialIcons"
            color="green"
          />
        </View>
        <Button
          title="Go To HomePage"
          titleStyle={{ fontSize: 18 }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 50,
            marginTop: 30,
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("AuthenticatedHomePage");
          }}
        />
      </View>
    );
  };

  return (
    <>
      <Header title="PaymentPortalPage" navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {isAuthenticated ? (
          <GeneralCard contents={<PaymentPortalPagePhaseFour />} />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }} color="red">
              Cannot Authenticate the payment
            </Text>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormStepperProgressBar
          navigation={navigation}
          theme={theme}
          labels={paymentFormSteps}
          currentPosition={3}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default withTheme(PaymentPortalPagePhaseFourPage);
