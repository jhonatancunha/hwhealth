import { NavigationContainer } from '@react-navigation/native';

import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { AuthHelper } from '../helper/auth-helper';
import { NotificationHelper } from '../helper/notification-helper';
import { useAuth } from '../hooks/useAuth';
import { TokenNotRequiredStack } from './TokenNotRequired';
import { TokenRequiredStack } from './TokenRequired';

export const RootRoutes = () => {
    const { info, updateUserOneSignalInfo, updateInfo, logout } = useAuth();
    const [checkedToken, setCheckedToken] = useState(false);

    const getOneSignalUserID = useCallback(async () => {
        try {
            const data = await OneSignal.getDeviceState();
            updateUserOneSignalInfo(data);
        } catch (error) {
            console.warn('error', error);
        }
    }, [updateUserOneSignalInfo]);

    const handleCheckToken = useCallback(async () => {
        setCheckedToken(false);
        try {
            const token = await AuthHelper.getItem('@token');
            const refreshToken = await AuthHelper.getItem('@refreshToken');

            updateInfo(token, refreshToken);
        } catch (error) {
            logout();
        } finally {
            setCheckedToken(true);
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

    if (!checkedToken) {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
