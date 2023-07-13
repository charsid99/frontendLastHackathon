import React from "react";
import { Text, View,  SafeAreaView, FlatList, StyleSheet,StatusBar } from "react-native";
import Header from "../components/Header";

const DATA = [
  {
    userId: 'Chirag',
    type: 'DEBIT',
    date: '26/2/2021',
    mode: '(UPI)',
    amount: '10,000',
    ClosingBalance:'40,000',
  },
  {
    userId: 'Eshwar',
    type: 'DEBIT',
    date: '26/2/2021',
    mode: '(UPI)',
    amount: '25,000',
    ClosingBalance:'50,000',
  },
  {
    userId: 'Siddharth',
    type: 'CREDIT',
    date: '25/2/2021',
    mode: '(UPI)',
    amount: '25,000',
    ClosingBalance:'75,000',
  },
];

const Item = ({ userId, type,
date,
mode,
amount,
ClosingBalance,}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{userId}  {type}  {date} {mode}</Text>
    <Text style={styles.secondline}>{amount}   Balance:{ClosingBalance} </Text>
  </View>
);

const StatementPage = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item userId={item.userId} type={item.type} date={item.date} mode={item.mode} amount={item.amount} ClosingBalance={item.ClosingBalance} />
  );

  return (
    <>
    <Header title="StatementPage" navigation={navigation} />
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  secondline:{
    fontSize: 20,
  }
});

export default StatementPage;
