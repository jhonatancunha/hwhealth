import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../theme/colors';

interface IForm {
    email: string;
    password: string;
}

export const LoginScreen = () => {
    const { control, handleSubmit } = useForm<IForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
        console.log(data);
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
            <Button label="Entrar" onPress={handleSubmit(onSubmit)} />
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
        fontSize: 18,
        fontWeight: 'bold',
    },
});
