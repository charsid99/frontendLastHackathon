import StepIndicator from "react-native-step-indicator";
import React, { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Keyboard } from "react-native";
import { withTheme } from "react-native-paper";

const FormStepperProgressBar = ({ currentPosition, labels, theme }) => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });
    return () => {};
  }, []);
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.colors.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: theme.colors.primary,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: theme.colors.primary,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.colors.primary,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: theme.colors.primary,
  };

  return (
    <View style={{ height: keyboardIsVisible ? 0 : 100 }}>
      <StepIndicator
        stepCount={labels.length}
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        onPress={() => {}}
      />
    </View>
  );
};

export default FormStepperProgressBar;
