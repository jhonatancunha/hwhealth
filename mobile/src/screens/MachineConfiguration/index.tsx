import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { InputSlider } from '../../components/Slider/input';

interface ILimiar {
    limiarCPU: number;
    limiarRam: number;
    limiarSwap: number;
    limiarDisk: number;
    limiarBattery: number;
}

export const MachineConfigurationScreen = () => {
    const navigation = useNavigation();

    const { control, handleSubmit, setValue } = useForm<ILimiar>({
        defaultValues: {
            limiarCPU: 60,
            limiarRam: 60,
            limiarSwap: 60,
            limiarDisk: 60,
            limiarBattery: 60,
        },
    });

    const onSubmit: SubmitHandler<ILimiar> = (data: ILimiar) => {
        console.log(data);

        // Show success message
        Alert.alert('Sucesso', 'Limiares atualizados.', [
            {
                text: 'OK',
                onPress: navigation.goBack,
            },
        ]);
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.container}>
                <Controller
                    name="limiarCPU"
                    control={control}
                    render={({ field }) => (
                        <InputSlider
                            {...field}
                            minimumValue={60}
                            maximumValue={100}
                            label="Limiar temperatura CPU (°C)"
                            sufix="°C"
                            onValueChange={value => {
                                setValue('limiarCPU', value);
                            }}
                            step={1}
                            value={field.value}
                        />
                    )}
                />

                <Controller
                    name="limiarRam"
                    control={control}
                    render={({ field }) => (
                        <InputSlider
                            {...field}
                            minimumValue={60}
                            maximumValue={100}
                            label="Limiar uso memória RAM (%)"
                            sufix="%"
                            onValueChange={value => {
                                setValue('limiarRam', value);
                            }}
                            step={1}
                            value={field.value}
                        />
                    )}
                />

                <Controller
                    name="limiarSwap"
                    control={control}
                    render={({ field }) => (
                        <InputSlider
                            {...field}
                            minimumValue={60}
                            maximumValue={100}
                            label="Limiar uso memória SWAP (%)"
                            sufix="%"
                            onValueChange={value => {
                                setValue('limiarSwap', value);
                            }}
                            step={1}
                            value={field.value}
                        />
                    )}
                />

                <Controller
                    name="limiarDisk"
                    control={control}
                    render={({ field }) => (
                        <InputSlider
                            {...field}
                            minimumValue={60}
                            maximumValue={100}
                            label="Limiar uso armazenamento de disco (%)"
                            sufix="%"
                            onValueChange={value => {
                                setValue('limiarDisk', value);
                            }}
                            step={1}
                            value={field.value}
                        />
                    )}
                />

                <Controller
                    name="limiarBattery"
                    control={control}
                    render={({ field }) => (
                        <InputSlider
                            {...field}
                            minimumValue={60}
                            maximumValue={100}
                            label="Limiar bateria (%)"
                            sufix="%"
                            onValueChange={value => {
                                setValue('limiarBattery', value);
                            }}
                            step={1}
                            value={field.value}
                        />
                    )}
                />
            </ScrollView>
            <View style={styles.footer}>
                <Button label="Salvar" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        gap: 20,
    },
    inputContainer: {
        width: '100%',
    },
    footer: {
        width: '100%',
    },
});
