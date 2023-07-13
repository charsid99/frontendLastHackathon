import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { withTheme } from "react-native-paper";
import { sendTextToBot } from "../constants/URI";
import { getData } from "../utils/storageUtils";
const NormalChatBot = ({ navigation, theme }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: new Date(),
        text: "Hello What Can I do for you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "BankBot",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={async (messages) => {
        onSend(messages);
        const userId = await getData("userId") || "CHARSID"
        const response = await sendTextToBot(
          userId,
          messages[0].text,
          "",
          false
        );
        console.log("Hi");
        const text = response.success
          ? response.text
          : "Sorry, I had some issue processing your request.";
        onSend({
          _id: new Date(),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "BankBot",
            avatar: "https://placeimg.com/140/140/any",
          },
        });
      }}
      user={{
        _id: 1,
      }}
    />
  );
};
export default withTheme(NormalChatBot);
