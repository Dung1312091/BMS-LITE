import { AsyncStorage } from 'react-native';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
export function* storeToken(name, responseData) {
    AsyncStorage.setItem(name, responseData, (err) => {
        if (err) {
            console.warn("an error");
            throw err;
        }
    }).catch((err) => {
        console.warn("error is: " + err);
    });
}
export async function getToken(name) {
    try {
        // console.warn('ko co token 111');
        let accessToken = await AsyncStorage.getItem(name);
        if (!accessToken) {
            console.warn('ko co token');
        } else {
            return accessToken;
        }
    } catch (error) {
        console.warn(error.message);

    }
}
export async function deleteToken(name) {
    try {
        await AsyncStorage.removeItem(name);
    } catch (error) {
    }
}