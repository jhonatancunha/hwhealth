import React, { createContext, useCallback, useMemo, useState } from 'react';

interface IAuthContext {
    info: boolean;
}

export const AuthContext = createContext<IAuthContext>({ info: false });

interface IAuth {
    children: React.ReactElement;
}

export const AuthProvider = ({ children }: IAuth) => {
    const [info, setInfo] = useState<boolean>(false);

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
        }),
        [info, login, register],
    );

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
