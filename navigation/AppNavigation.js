import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text } from "react-native-elements";
import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import NewsPage from "../screens/NewsPage";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthenticatedBlindPersonHomePage from "../screens/AuthenticatedBlindPersonHomePage";
import PasswordPage from "../screens/PasswordPage";
import BiometricAuthPage from "../screens/BiometricAuthPage"
import AuthenticatedHomePage from "../screens/AuthenticatedHomePage";
import StatementPage from "../screens/StatementPage";
import BeneficiariesListPage from "../screens/BeneficiariesListPage";
import QuickTransferPage from "../screens/QuickTransferPage";
import PaymentPortalPage from "../screens/PaymentPortalPage";
import PaymentPortalPagePhaseTwoPage from "../screens/PaymentPortalPagePhaseTwoPage";
import PaymentPortalPagePhaseThreePage from "../screens/PaymentPortalPagePhaseThreePage";
import PaymentPortalPagePhaseFourPage from "../screens/PaymentPortalPagePhaseFourPage";
import NormalChatBot from "../screens/NormalChatBot";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#101010",
        style: {
          backgroundColor: "#ffd700",
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="News" component={NewsPage} />
      <Drawer.Screen name="Chat" component={NormalChatBot} />
      <Drawer.Screen
        name="BlindHome"
        component={AuthenticatedBlindPersonHomePage}
      />
    </Drawer.Navigator>
  );
}
function AuthenticatedHomeNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ color: "blue" }}
      initialRouteName="AuthenticatedHomePage"
      screenOptions={({ route }) => ({
        title: ({ focused, color, size }) => {
          let name = "";
          if (route.name === "AuthenticatedHomePage") {
            name = "Home";
          } else if (route.name === "BeneficiariesListPage") {
            name = "Contacts";
          } else if (route.name === "QuickTransferPage") {
            name = "Chat";
          } else if (route.name === "StatementPage") {
            name = "Statement";
          }
          return (
            <Text
              style={{ color: focused ? "#0018A8" : "#FFF", marginRight: 1 }}
            >
              {name}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let colorCurrent;
          console.log(route.name);
          if (route.name === "AuthenticatedHomePage") {
            iconName = "account-balance";
          } else if (route.name === "BeneficiariesListPage") {
            iconName = "group";
          } else if (route.name === "QuickTransferPage") {
            iconName = "bookmark";
          } else if (route.name === "StatementPage") {
            iconName = "assignment";
          }
          colorCurrent = focused ? "#0018A8" : "#FFF";

          // You can return any component that you like here!
          return (
            <Icon
              iconStyle={{ fontSize: 35 }}
              name={iconName}
              type="MaterialIcons"
              color={colorCurrent}
            />
          );
        },
      })}
      tabBarOptions={{
        style: { backgroundColor: "#0018A8", minHeight: 60 },
        activeBackgroundColor: "#FFF",
      }}
    >
      <Tab.Screen
        name="BeneficiariesListPage"
        component={BeneficiariesListPage}
      />
      <Tab.Screen
        name="AuthenticatedHomePage"
        component={AuthenticatedHomePage}
      />
      <Tab.Screen name="QuickTransferPage" component={AuthenticatedBlindPersonHomePage} />
      <Tab.Screen name="StatementPage" component={StatementPage} />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeDrawerNavigator} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Password" component={PasswordPage} />
        <Stack.Screen name="Biometric" component={BiometricAuthPage} />
        <Stack.Screen
          name="AuthenticatedHomePage"
          component={AuthenticatedHomeNavigator}
        />
        <Stack.Screen
          name="PaymentPortalPage"
          component={PaymentStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function PaymentStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PaymentPortalPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PaymentPortalPage" component={PaymentPortalPage} />
      <Stack.Screen
        name="PaymentPortalPagePhaseOne"
        component={PaymentPortalPage}
      />
      <Stack.Screen
        name="PaymentPortalPagePhaseTwo"
        component={PaymentPortalPagePhaseTwoPage}
      />
      <Stack.Screen
        name="PaymentPortalPagePhaseThree"
        component={PaymentPortalPagePhaseThreePage}
      />
      <Stack.Screen
        name="PaymentPortalPagePhaseFour"
        component={PaymentPortalPagePhaseFourPage}
      />
      <Stack.Screen
        name="AuthenticatedHomePage"
        component={AuthenticatedHomeNavigator}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
