import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(value);
      resolve(value);
    } catch (e) {
      // error reading value
    }
  });
};

export async function clearData(){
  await AsyncStorage.clear();
  console.log("in clearing async storage");
}

export default storeData;
