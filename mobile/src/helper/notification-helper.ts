import AsyncStorage from '@react-native-async-storage/async-storage';
import lodash from 'lodash';
import { OSNotification } from 'react-native-onesignal';
const NotificationHelperKey = __DEV__
    ? '@NotificationHelper_dev:'
    : '@NotificationHelper:';

export const NotificationHelper = {
    /**
     * Armazena a chave e valor no AsyncStorage.
     * @param {string} key
     * @param {OSNotification} value
     * @return {Promise}
     */
    setItem: async (key: string, value: OSNotification): Promise<void> => {
        let notifications: OSNotification[] = [];

        const currentNotifications = await NotificationHelper.getItem(key);

        if (!currentNotifications?.length) {
            notifications = [value];
        } else {
            notifications = [value, ...currentNotifications];
        }

        notifications = lodash.uniqBy(notifications, 'notificationId');
        const strValue = JSON.stringify(notifications);

        return AsyncStorage.setItem(NotificationHelperKey + key, strValue);
    },

    /**
     * Recupera o valor da chave armazenado no AsyncStorage.
     * @param {string} key
     * @return {Promise<OSNotification[] | []>}
     */
    getItem: async (key: string): Promise<OSNotification[] | []> => {
        const strValue = await AsyncStorage.getItem(
            NotificationHelperKey + key,
        );
        if (!strValue) return [];
        try {
            let notifications = JSON.parse(strValue);
            notifications = lodash.uniqBy(notifications, 'notificationId');
            return notifications;
        } catch (ex) {
            return [];
        }
    },

    /**
     * Remove o valor da chave armazenado no AsyncStorage.
     * @param {string} key
     * @return {Promise}
     */
    removeItem: (key: string): Promise<void> =>
        AsyncStorage.removeItem(NotificationHelperKey + key),

    /**
     * Remove o valor da chave armazenado no AsyncStorage.
     * @param {string} key id do usuário
     * @return {Promise}
     */
    clear: async (key: string) => {
        AsyncStorage.removeItem(NotificationHelperKey + key);
    },
};
