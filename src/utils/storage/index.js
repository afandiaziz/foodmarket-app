import asyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../showMessage';

export const storeData = async (storageKey, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await asyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
        showMessage('Gagal menyimpan di localstorage');
    }
};

export const getData = async storageKey => {
    try {
        const jsonValue = await asyncStorage.getItem(storageKey);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        showMessage('Gagal mengambil data dari localstorage');
    }
};
