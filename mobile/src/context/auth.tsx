import React, { createContext, useCallback, useMemo, useState } from 'react';
import { DeviceState } from 'react-native-onesignal';

interface IAuthContext {
    logout: () => void;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
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
    logout: function (): void {
        throw new Error(`Function not implemented.`);
    },
    register: function (email: string, password: string): void {
        throw new Error(`Function not implemented.`);
    },
    login: function (email: string, password: string): void {
        throw new Error(`Function not implemented.`);
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
            console.log('logout');

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
