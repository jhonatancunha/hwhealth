/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';

import { PermissionsAndroid } from 'react-native';
import { AuthProvider } from './context/auth';
import { RootRoutes } from './routes';

export function App(): JSX.Element {
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
            <RootRoutes />
        </AuthProvider>
    );
}
