import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { withTheme } from "react-native-paper";
import { Text, View, SafeAreaView, AccessibilityInfo } from "react-native";
import {Button} from "react-native-elements"

import { canUseLocalAuth } from "../utils/nativeAuthUtils";
import storeData from "../utils/storageUtils";

const BiometricAuthPage = ({ theme, navigation }) => {
  global.isBiometricEnabled = false;

  const [isLoading, setIsLoading] = useState(false);

  const enableBiometric = () => {
    const checkBiometric = async () => {
      const canUseBiometric = await canUseLocalAuth();
      if (canUseBiometric) {
        isBiometricEnabled = true;
        storeData("biometric", "yes");
      }
    };

    checkBiometric();
    setIsLoading(true);
    AccessibilityInfo.isScreenReaderEnabled().then(
      screenReaderEnabled => {
        if(screenReaderEnabled){
          navigation.navigate(
            "AuthenticatedHomePage",
            {
              screen: "AuthenticatedHomePage",
            },
            1000
          );
        }
        else{
          navigation.navigate(
            "AuthenticatedHomePage",
            {
              screen: "BlindHome",
            },
            1000
          );
        }
      }
    );
 
  };

  const disableBiometric = () => {
    isBiometricEnabled = false;
    setIsLoading(true);
    navigation.navigate(
      "AuthenticatedHomePage",
      {
        screen: "AuthenticatedHomePage",
      },
      1000
    );
  };

  return (
    <>
      <Header title="Biometric" navigation={navigation} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                textAlign: "center",
                fontFamily: "Lato-Bold",
                marginBottom: 16,
              }}
            >
              Do you want to enable Biometric authentication?
              <View style={{ height: 100 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  height: 60,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Yes"
                  titleStyle={{fontSize:25}}
                  buttonStyle={{ fonstsize: 20, paddingHorizontal: 20,backgroundColor:"green" }}
                  onPress={enableBiometric}
                />
                <View style={{ width: 100 }}></View>
                <Button
                  title="No"
                  titleStyle={{fontSize:25}}
                  buttonStyle={{ fonstsize: 20, paddingHorizontal: 20,backgroundColor:"red" }}
                  onPress={disableBiometric}
                />
              </View>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default withTheme(BiometricAuthPage);
