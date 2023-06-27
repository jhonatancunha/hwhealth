import React, { createContext, useCallback, useMemo, useState } from 'react';
import { DeviceState } from 'react-native-onesignal';
import { AuthHelper } from '../helper/auth-helper';
import { api } from '../services/axios';

interface IAuth {
    children: React.ReactElement;
}

interface IInfo {
    accessToken: string | null;
    refreshToken: string | null;
}

interface IAuthContext {
    logout: () => void;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    info: IInfo;
    userOneSignalInfo: DeviceState | null;
    updateUserOneSignalInfo: (data: DeviceState | null) => void;
    updateInfo: (
        paramsToken: string | null,
        paramsRefreshToken: string | null,
    ) => void;
}

export const AuthContext = createContext<IAuthContext>({
    info: {
        accessToken: null,
        refreshToken: null,
    },
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
    updateInfo: function (
        paramsToken: string | null,
        paramsRefreshToken: string | null,
    ): void {
        throw new Error(`Function not implemented.`);
    },
});

export const AuthProvider = ({ children }: IAuth) => {
    const [info, setInfo] = useState<IInfo>({
        accessToken: null,
        refreshToken: null,
    });
    const [userOneSignalInfo, setUserOneSignalInfo] =
        useState<DeviceState | null>(null);

    const updateUserOneSignalInfo = useCallback((data: DeviceState | null) => {
        setUserOneSignalInfo(data);
    }, []);

    const updateInfo = useCallback(
        (paramsToken: string | null, paramsRefreshToken: string | null) => {
            setInfo({
                accessToken: paramsToken,
                refreshToken: paramsRefreshToken,
            });
        },
        [],
    );

    const register = useCallback(
        async (email: string, password: string) => {
            try {
                await api.post('/auth/sign-up', {
                    email,
                    password,
                });

                // setInfo({accessToken});
            } catch (error) {
                updateInfo(null, null);
            }
        },
        [updateInfo],
    );

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                const { data } = await api.post('/auth/sign-in', {
                    email,
                    password,
                });

                const { accessToken, refreshToken } = data;

                AuthHelper.setItem('@token', accessToken);
                AuthHelper.setItem('@refreshToken', refreshToken);
                updateInfo(accessToken, refreshToken);
            } catch (error) {
                updateInfo(null, null);
            }
        },
        [updateInfo],
    );

    const logout = useCallback(async () => {
        try {
            AuthHelper.removeItem('@token');
            AuthHelper.removeItem('@refreshToken');
        } finally {
            updateInfo(null, null);
        }
    }, [updateInfo]);

    const values = useMemo(
        () => ({
            info,
            logout,
            login,
            register,
            updateUserOneSignalInfo,
            userOneSignalInfo,
            updateInfo,
        }),
        [
            info,
            logout,
            login,
            register,
            updateUserOneSignalInfo,
            userOneSignalInfo,
            updateInfo,
        ],
    );

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
