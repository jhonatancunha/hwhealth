import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { TokenNotRequiredStack } from './TokenNotRequired';
import { TokenRequiredStack } from './TokenRequired';

export const RootRoutes = () => {
    const { info } = useAuth();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const studentData = await getOnLocalStorage(studentStorageItem);
    //         if (studentData) {
    //             setStudentInfo(studentData);
    //             setLoggedIn(true);
    //         }
    //     };

    //     fetchData();
    // }, [isLoggedIn]);

    return (
        <NavigationContainer>
            {!info ? <TokenNotRequiredStack /> : <TokenRequiredStack />}
        </NavigationContainer>
    );
};
