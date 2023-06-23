import { NavigationContainer } from '@react-navigation/native';

import { useCallback, useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { useAuth } from '../hooks/useAuth';
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
    }, [updateUserOneSignalInfo]);

    useEffect(() => {
        getOneSignalUserID();
    }, [getOneSignalUserID]);

    console.log('userOneSignalInfo', userOneSignalInfo);

    return (
        <NavigationContainer>
            <TokenRequiredStack />
            {/* {!info ? <TokenNotRequiredStack /> : <TokenRequiredStack />} */}
        </NavigationContainer>
    );
};
