import React from "react";
import { Text, View } from "react-native";
const Balance = ({ balance }) => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          padding: 30,
        }}
      >
        <View
          style={{ backgroundColor: "#00D2F3", width: "30%", height: 10 }}
        ></View>
        <View
          style={{
            backgroundColor: "white",
            width: "70%",
            height: 15,
            elevation: 10,
          }}
        ></View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Lato-Bold",
            fontSize: 41,
            color: "#FFF",
            marginTop: 25,
          }}
        >
          {balance || "23,000"}
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 30,
              color: "#FFF",
              marginTop: 25,
            }}
          >
            {" "}
            INR
          </Text>
        </Text>
      </View>
      <View
        style={{
          marginLeft: "30%",
          marginTop: "10%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#00D2F3",
              marginRight: 5,
            }}
          ></View>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 14,
              color: "#FFF",
            }}
          >
            PREVIOUS MONTH
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#FFF",
              marginRight: 5,
            }}
          ></View>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              fontSize: 14,
              color: "#FFF",
            }}
          >
            CURRENT MONTH
          </Text>
        </View>
      </View>
    </>
  );
};

export default Balance;
