import Header from "../components/Header";
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from "../utils/animationUtils";
import Balance from "../components/Balance";
import { Button, Icon } from "react-native-elements";
import { getData } from "../utils/storageUtils";
import { getBalance } from "../constants/URI";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Dimensions.get("window").height * 0.6;

class AuthenticatedHomePage extends Component {
  state = {
    index: 0,
    DATA: [],
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }
  componentDidMount() {
    const getRealBalance = async () => {
      const userId = await getData("userId");
      const data = await getBalance(userId);
      this.setState({
        ...this.state,
        DATA: [
          ...this.state.DATA,
          {
            title: "Balance",
            element: <Balance balance={data} />,
          },
        ],
      });
    };
    getRealBalance();
  }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#0018A8", "#03092A", "#000"]}
          style={[styles.itemContainer, { borderRadius: 20 }]}
          start={[0.0, 0.0]}
          end={[1, 1]}
          locations={[0.0, 0.8, 1.0]}
        >
          <View style={{ margin: 15 }}>
            <Text
              style={{ color: "#FFF", fontSize: 28, fontFamily: "Lato-Bold" }}
            >
              {item.title}
            </Text>
          </View>
          {item.element}
        </LinearGradient>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Header title="Login" navigation={this.props.navigation} />

        <Carousel
          ref={(c) => (this.carousel = c)}
          data={this.state.DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <Button
          icon={<Icon name="person" type="material" size={30} color="white" />}
          containerStyle={{
            padding: 10,
            margin: 30,
            marginHorizontal: 50,
          }}
          buttonStyle={{
            backgroundColor: this.props.theme.colors.accent,
            padding: 10,
            borderRadius: 25,
          }}
          titleStyle={{
            fontSize: 21,
            marginLeft: 10,
            fontFamily: "Lato-Bold",
          }}
          title="Make A Payment"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            this.props.navigation.navigate("PaymentPortalPage");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default withTheme(AuthenticatedHomePage);
