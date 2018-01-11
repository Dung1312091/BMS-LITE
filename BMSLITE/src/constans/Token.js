import { AsyncStorage } from 'react-native';
const SetLocalStorage = async (name, value) => {
   
    try {
        console.log('bat dau set Token');
        await AsyncStorage.setItem(name, value);
      } catch (error) {
        throw err;
      }
}
const GetLocalStorage = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null){
          // We have data!!
          console.log('day la value==>',value);
          return value;
        }
      } catch (error) {
        // Error retrieving data
      }
}
export const Token = {
    SetLocalStorage,
    GetLocalStorage
}