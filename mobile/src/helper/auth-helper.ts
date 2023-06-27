import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthHelperKey = __DEV__ ? '@AuthHelper_dev:' : '@AuthHelper:';

export const AuthHelper = {
    /**
     * Armazena a chave e valor no AsyncStorage.
     * @param {string} key
     * @param {string} value
     * @return {Promise}
     */
    setItem: (key: string, value: string): Promise<void> => {
        if (!value) {
            return AsyncStorage.removeItem(AuthHelperKey + key);
        }
        const strValue =
            typeof value !== 'string' ? JSON.stringify(value) : value;
        return AsyncStorage.setItem(AuthHelperKey + key, strValue);
    },

    /**
     * Recupera o valor da chave armazenado no AsyncStorage.
     * @param {string} key
     * @return {Promise<string | null>}
     */
    getItem: async (key: string): Promise<string | null> => {
        const strValue = await AsyncStorage.getItem(AuthHelperKey + key);

        if (!strValue) return null;
        try {
            return typeof strValue === 'string'
                ? strValue
                : JSON.stringify(strValue);
        } catch (ex) {
            return null;
        }
    },

    /**
     * Remove o valor da chave armazenado no AsyncStorage.
     * @param {string} key
     * @return {Promise}
     */
    removeItem: (key: string): Promise<void> =>
        AsyncStorage.removeItem(AuthHelperKey + key),

    clear: () => {
        return AsyncStorage.getAllKeys().then(keys => {
            const keysToClear = keys.filter((key: string) =>
                key.startsWith(AuthHelperKey),
            );
            return AsyncStorage.multiRemove(keysToClear);
        });
    },
};
