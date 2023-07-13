import * as LocalAuthentication from "expo-local-authentication";
export const canUseLocalAuth = async () => {
  return new Promise(async (resolve, reject) => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const hasWaysToAuth = await LocalAuthentication.isEnrolledAsync();
    let methods = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const hasMethodsToAuth = methods.length != 0;

    if (hasHardware && hasWaysToAuth && hasMethodsToAuth) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
export const localAuthenticate = async (message = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      let auth = await LocalAuthentication.authenticateAsync({
        promptMessage: message.length
          ? message
          : "Please Provide Your Fingerprint",
      });
      const isAuth = auth.success;

      if (isAuth) {
        resolve(true);
      } else {
        console.log(auth.error);
        resolve(false);
      }
    } catch (e) {
      resolve(false);
    }
  });
};
