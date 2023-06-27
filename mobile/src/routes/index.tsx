import { NavigationContainer } from '@react-navigation/native';

import { useCallback, useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { AuthHelper } from '../helper/auth-helper';
import { NotificationHelper } from '../helper/notification-helper';
import { useAuth } from '../hooks/useAuth';
import { TokenNotRequiredStack } from './TokenNotRequired';
import { TokenRequiredStack } from './TokenRequired';

export const RootRoutes = () => {
    const { info, updateUserOneSignalInfo, updateInfo, logout } = useAuth();

    const getOneSignalUserID = useCallback(async () => {
        try {
            const data = await OneSignal.getDeviceState();
            updateUserOneSignalInfo(data);
        } catch (error) {
            console.warn('error', error);
        }
    }, [updateUserOneSignalInfo]);

    const handleCheckToken = useCallback(async () => {
        try {
            const token = await AuthHelper.getItem('@token');
            const refreshToken = await AuthHelper.getItem('@refreshToken');

            updateInfo(token, refreshToken);
        } catch (error) {
            logout();
        }
    }, [logout, updateInfo]);

    OneSignal.setNotificationWillShowInForegroundHandler(
        async notificationReceivedEvent => {
            const notification = notificationReceivedEvent.getNotification();
            await NotificationHelper.setItem('1', notification);
            notificationReceivedEvent.complete(notification);
        },
    );

    OneSignal.setNotificationOpenedHandler(async ({ notification }) => {
        await NotificationHelper.setItem('1', notification);
    });

    useEffect(() => {
        getOneSignalUserID();
    }, [getOneSignalUserID]);

    useEffect(() => {
        handleCheckToken();
    }, [handleCheckToken]);

    return (
        <NavigationContainer>
            {!info.accessToken ? (
                <TokenNotRequiredStack />
            ) : (
                <TokenRequiredStack />
            )}
        </NavigationContainer>
    );
};
