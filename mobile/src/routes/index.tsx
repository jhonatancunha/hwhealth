import { NavigationContainer } from '@react-navigation/native';

import { useCallback, useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { NotificationHelper } from '../helper/notification-helper';
import { useAuth } from '../hooks/useAuth';
import { TokenRequiredStack } from './TokenRequired';

export const RootRoutes = () => {
    const { updateUserOneSignalInfo } = useAuth();

    const getOneSignalUserID = useCallback(async () => {
        try {
            const data = await OneSignal.getDeviceState();
            updateUserOneSignalInfo(data);
        } catch (error) {
            console.warn('error', error);
        }
    }, [updateUserOneSignalInfo]);

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
        async notificationReceivedEvent => {
            const notification = notificationReceivedEvent.getNotification();
            await NotificationHelper.setItem('1', notification);
            notificationReceivedEvent.complete(notification);
        },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(async ({ notification }) => {
        await NotificationHelper.setItem('1', notification);
    });

    useEffect(() => {
        getOneSignalUserID();
    }, [getOneSignalUserID]);

    return (
        <NavigationContainer>
            <TokenRequiredStack />
            {/* {!info ? <TokenNotRequiredStack /> : <TokenRequiredStack />} */}
        </NavigationContainer>
    );
};
