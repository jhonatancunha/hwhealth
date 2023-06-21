/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import { AuthProvider } from './context/auth';
import { AppStack } from './routes/AppStack';

function App(): JSX.Element {
    const requestCameraPermission = async () => {
        try {
            const teste = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Permissões de notificações',
                    message:
                        'Necessário para receber notificações sobre suas máquinas.',
                    buttonNeutral: 'Pergunte depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Aceitar',
                },
            );
            console.log('PermissionsAndroid POST_NOTIFICATIONS', teste);
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    return (
        <AuthProvider>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
