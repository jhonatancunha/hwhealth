import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
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
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
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
    logout: async function (): Promise<void> {
        throw new Error(`Function not implemented.`);
    },
    register: async function (email: string, password: string): Promise<void> {
        throw new Error(`Function not implemented.`);
    },
    login: async function (email: string, password: string): Promise<void> {
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
                if (error?.response?.data.statusCode === 400) {
                    Alert.alert(
                        'E-mail já utilizado.',
                        'Por favor, informe outro e-mail e tente novamente.',
                    );
                }
                updateInfo(null, null);
                throw error;
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
                if (error?.response?.data.statusCode === 404) {
                    Alert.alert(
                        'Credenciais inválidas.',
                        'Por favor, confira seu e-mail e senha e tente novamente.',
                    );
                }

                updateInfo(null, null);
                throw error;
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
