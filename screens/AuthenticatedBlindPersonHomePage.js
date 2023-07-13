import * as React from "react";
import { Text, View, StyleSheet,  } from "react-native";
import { Audio } from "expo-av";
import { speakFromTextAsync, startRecording } from "../utils/soundUtils";
import { sendVoiceToServer } from "../constants/URI";
import * as FileSystem from "expo-file-system";
import { Sound } from "expo-av/build/Audio";
import * as Speech from "expo-speech";
import { getData } from "../utils/storageUtils";
import { localAuthenticate } from "../utils/nativeAuthUtils";
import { Button } from "react-native-elements";
import { withTheme } from "react-native-paper";
function AuthenticatedBlindPersonHomePage({navigation,theme}) {
  const [recording, setRecording] = React.useState();
  const [isDisabled, setIsDisabled] =  React.useState(false)

  async function sendToServer(uri) {
    return new Promise(async (resolve, reject) => {
      const data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const userId = await getData("userId") || "CHARSID"
      const response = await sendVoiceToServer(userId, data, "", true);
      console.log(response)
      try{
      if(response.response.success){
        const authenticated = await localAuthenticate();
        if(authenticated){
          Speech.speak("Authenticated",{pitch:1.1,rate:1.5});
        }
      }}
      catch(error){}
      const base64 = response.audio;
      Speech.speak(response.text,{onDone:()=>{
        setIsDisabled(false)
      },pitch:1.1,rate:1.5});
      console.log("Delete the file");
    
      
    });
  }
  const playSound = async (base64, uri) => {
    return new Promise(async (resolve, reject) => {
      console.log(uri);
      const sound = new Audio.Sound();
      const response = await FileSystem.writeAsStringAsync(uri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(response);

      await sound.loadAsync({ uri: uri });
      await sound.playAsync();
      await sound.unloadAsync();
      resolve(true);
    });
  };
  async function stopRecording() {
    setRecording(undefined);
    setIsDisabled(true)
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    await sendToServer(uri);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
      buttonStyle={{
        backgroundColor: theme.colors.background,
        padding: 10,
        borderRadius: 25,
        marginBottom:20,
      
      }}
      containerStyle={{margin:20}}
      disabled={isDisabled}
      titleStyle={{
        fontSize:24
      }}
        title={recording ? "Stop Speaking" : "Start Speaking"}
        onPress={
          recording
            ? stopRecording
            : () => {
                startRecording(setRecording);
              }
        }
      />
        <Button
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 25,
            
          }}
          containerStyle={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 25,
          }}
        title={"Switch To Normal Mode"}
        containerStyle={{margin:20}}
        titleStyle={{
          fontSize:24
        }}
        onPress={()=>{ navigation.navigate(
          "Home",
          {
            screen: "Chat",
          },
          1000
        );}
        
        }
      />
    </View>
  );
}
export default withTheme(AuthenticatedBlindPersonHomePage)