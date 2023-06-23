import React, { createContext, useCallback, useMemo, useState } from 'react';
import { DeviceState } from 'react-native-onesignal';

interface IAuthContext {
    info: boolean;
    userOneSignalInfo: DeviceState | null;
    updateUserOneSignalInfo: (data: DeviceState | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
    info: false,
    userOneSignalInfo: null,
    updateUserOneSignalInfo: function (data: DeviceState | null): void {
        throw new Error(`Function not implemented. Data: ${data}`);
    },
});

interface IAuth {
    children: React.ReactElement;
}

export const AuthProvider = ({ children }: IAuth) => {
    const [info, setInfo] = useState<boolean>(false);
    const [userOneSignalInfo, setUserOneSignalInfo] =
        useState<DeviceState | null>(null);

    const updateUserOneSignalInfo = useCallback((data: DeviceState | null) => {
        setUserOneSignalInfo(data);
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        try {
            console.log(email, password);

            setInfo(true);
        } catch (error) {
            console.warn(error);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            console.log(email, password);
            setInfo(true);
        } catch (error) {
            console.log('error', error);
        }
    }, []);

    const logout = async () => {
        try {
            setInfo(false);
            // await AsyncStorage.clear();
        } catch (error) {
            // console.warn(error);
        }
    };

    const values = useMemo(
        () => ({
            info,
            logout,
            login,
            register,
            updateUserOneSignalInfo,
            userOneSignalInfo,
        }),
        [info, login, register, userOneSignalInfo, updateUserOneSignalInfo],
    );

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
