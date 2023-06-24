import { useNavigation } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme/colors';

interface IForm {
    email: string;
    password: string;
}

export const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const { control, handleSubmit } = useForm<IForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
        login(data.email, data.password);
    };

    const goRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HWHealth Login</Text>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        {...field}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        {...field}
                    />
                )}
            />
            <Button
                label="Entrar"
                onPress={handleSubmit(onSubmit)}
                backgroundColor={colors.green}
                labelColor={colors.white}
            />
            <Button
                label="Registrar-se"
                onPress={goRegister}
                backgroundColor={colors.pink}
                labelColor={colors.white}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        paddingHorizontal: 30,
        gap: 30,
    },
    title: {
        fontSize: 25,
        fontFamily: 'Inter-Bold',
    },
});
