import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from "../constants/RecordingPresets";
export const speakFromTextAsync = (phrase) => {
  return new Promise((resolve, reject) => {
    Speech.speak(phrase);
    resolve(true);
  });
};

export async function startRecording(setRecording) {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    console.log("Starting recording..");
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    setRecording(recording);
    console.log("Recording started");
  } catch (err) {
    console.error("Failed to start recording", err);
  }
}
