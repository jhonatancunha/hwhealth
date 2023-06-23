import { NavigationContainer } from '@react-navigation/native';

import { useCallback, useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { useAuth } from '../hooks/useAuth';
import { TokenNotRequiredStack } from './TokenNotRequired';
import { TokenRequiredStack } from './TokenRequired';

export const RootRoutes = () => {
    const { info, updateUserOneSignalInfo, userOneSignalInfo } = useAuth();

    const getOneSignalUserID = useCallback(async () => {
        try {
            const data = await OneSignal.getDeviceState();
            updateUserOneSignalInfo(data);
        } catch (error) {
            console.log('error', error);
        }
    }, []);

    useEffect(() => {
        getOneSignalUserID();
    }, [getOneSignalUserID]);

    console.log('userOneSignalInfo', userOneSignalInfo);

    return (
        <NavigationContainer>
            {!info ? <TokenNotRequiredStack /> : <TokenRequiredStack />}
        </NavigationContainer>
    );
};
