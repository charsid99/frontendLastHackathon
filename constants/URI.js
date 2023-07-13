import axios from "axios";
const nodeServer = "https://vi-service-dot-gcp-hackathon-demo-project.du.r.appspot.com";
const javaServer = "https://hecktitan-java-new-dot-gcp-hackathon-demo-project.du.r.appspot.com";
const javaServerBackup =
  "https://hecktitan-java-dot-hack-titans.el.r.appspot.com";
export const sendVoiceToServer = async (
  userId,
  data,
  prevResponse,
  isAudio = false
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(nodeServer + "/sendMessage", {
      userId,
      query: data,
      prevResponse,
      isAudio,
    });
    console.log(response.data.text);
    resolve(response.data);
  });
};
export const sendTextToBot = async (
  userId,
  data,
  prevResponse,
  isAudio = false
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(nodeServer + "/sendMessage", {
      userId,
      query: data,
      prevResponse,
      isAudio,
    });
    resolve(response.data);
  });
};
export const payViaUPI = async (
  userId,
  data,
  prevResponse,
  isAudio = false
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(javaServer + "/sendMessage", {
      userId,
      query: data,
      prevResponse,
      isAudio,
    });
    resolve(response.data);
  });
};
export const payViaAccountNumber = async (
  userId,
  accountNumber,
  amount,
  latitude,
  longitude,
  remark
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(javaServer + "/pay/accountNumber", {
      userId,
      accountNumber,
      amount,
      latitude,
      longitude,
      remark,
    });
    resolve(response.data);
  });
};
export const payViaBeneficiary = async (
  userId,
  beneficiaryId,
  amount,
  latitude ="18",
  longitude="18",
  remark="For demo"
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(javaServer + "/pay/beneficiary", {
      userId,
      beneficiaryId,
      amount,
      latitude,
      longitude,
      remark,
    });
    resolve(response.data);
  });
};
export const login = async (userId, password) => {
  return new Promise(async (resolve, reject) => {
    // if (password.length == 0) {
    //   password = "siddharthdbemployee";
    // }
    const response = await axios.post(javaServer + "/userLogin", {
      phoneNumber: userId,
      password: password,
    });
    resolve(response.data);
  });
};
export const addBeneficiary = async (
  userId,
  data,
  prevResponse,
  isAudio = false
) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(javaServer + "/sendMessage", {
      userId,
      query: data,
      prevResponse,
      isAudio,
    });
    resolve(response.data);
  });
};
export const getBalance = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(
      javaServer + "/balance" + "?userId=" + userId
    );
    resolve(response.data);
  });
};
export const getTransactions = async (userId, startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(javaServer + "/transactions", {
      userId: userId,
      startDate,
      endDate,
    });
    resolve(response.data);
  });
};
export const getAllBeneficiaries = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(
      javaServer + "/beneficiaries" + "?userId=" + userId
    );
    resolve(response.data);
  });
};
