import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme/colors';

interface IForm {
    email: string;
    password: string;
}

const validationSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z
        .string()
        .min(6, { message: 'Senha deve conter pelo menos 6 caracteres.' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const RegisterScreen = () => {
    const navigation = useNavigation();
    const { register } = useAuth();

    const { control, handleSubmit } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<IForm> = async ({
        email,
        password,
    }: IForm) => {
        try {
            await register(email, password);

            navigation.popToTop();
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar conta</Text>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        field={field}
                        fieldState={fieldState}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        field={field}
                        fieldState={fieldState}
                        secureTextEntry
                    />
                )}
            />
            <Button label="Confirmar" onPress={handleSubmit(onSubmit)} />
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
        fontFamily: 'Inter-Black',
    },
});
