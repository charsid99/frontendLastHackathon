import React from "react";
import Header from "../components/Header";
import { Animated, FlatList, View } from "react-native";
import NewsCardAnimationWrapper from "../components/NewsCardAnimationWrapper";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const dummyData = [
  {
    title: "DB goes fully accessible",
    content: "Deutsche Bank Announces Tech program for accessibility",
    knowMoreLink: "AccessiblityInDb",
  },
  {
    title: "How To Personalize the app?",
    content: "DB Banking app can be personalized to a whole new level",
    knowMoreLink: "personalizeHowTo",
  },
  {
    title: "DB goes fully accessible",
    content: "Deutsche Bank Announces Tech program for accessibility",
    knowMoreLink: "AccessiblityInDb",
  },
  {
    title: "DB goes fully accessible",
    content: "Deutsche Bank Announces Tech program for accessibility",
    knowMoreLink: "AccessiblityInDb",
  },
  {
    title: "DB goes fully accessible",
    content: "Deutsche Bank Announces Tech program for accessibility",
    knowMoreLink: "AccessiblityInDb",
  },
  {
    title: "How To Personalize the app?",
    content: "DB Banking app can be personalized to a whole new level",
    knowMoreLink: "personalizeHowTo",
  },
];

const NewsPage = ({ theme, navigation }) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <View style={{ flex: 1 }}>
      <Header title="News" navigation={navigation} />
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={dummyData}
        renderItem={({ index, item }) => (
          <NewsCardAnimationWrapper {...{ index, y, data: item }} />
        )}
        keyExtractor={(item) => item.index}
        {...{ onScroll }}
      />
    </View>
  );
};

export default NewsPage;
