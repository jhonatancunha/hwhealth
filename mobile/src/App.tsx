import { useEffect } from 'react';

import { PermissionsAndroid } from 'react-native';
import { AuthProvider } from './context/auth';
import { RootRoutes } from './routes';

export function App(): JSX.Element {
    const requestCameraPermission = async () => {
        try {
            await PermissionsAndroid.request(
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
