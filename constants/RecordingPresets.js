import { Audio } from "expo-av";
import { RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC } from "expo-av/build/Audio";

// export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
//   android: {
//     extension: ".amr",
//     outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
//     audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
//     sampleRate: 16000,
//     numberOfChannels: 1,
//     bitRate: 128000,
//   },
//   ios: {
//     extension: ".amr",
//     audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
//     sampleRate: 44100,
//     numberOfChannels: 1,
//     bitRate: 128000,
//     linearPCMBitDepth: 16,
//     linearPCMIsBigEndian: false,
//     linearPCMIsFloat: false,
//   },
// };

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
