import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { InputSlider } from '../../components/Slider/input';

export const MachineConfigurationScreen = () => {
    const [value, setValue] = useState(60);

    return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.container}>
                <InputSlider
                    minimumValue={60}
                    maximumValue={100}
                    value={value}
                    onValueChange={value => setValue(value[0])}
                    label="Limiar temperatura CPU (°C)"
                    sufix="°C"
                />
                <InputSlider
                    minimumValue={60}
                    maximumValue={100}
                    value={value}
                    onValueChange={value => setValue(value[0])}
                    label="Limiar uso memória RAM (%)"
                    sufix="%"
                />
                <InputSlider
                    minimumValue={60}
                    maximumValue={100}
                    value={value}
                    onValueChange={value => setValue(value[0])}
                    label="Limiar uso memória SWAP (%)"
                    sufix="%"
                />
                <InputSlider
                    minimumValue={60}
                    maximumValue={100}
                    value={value}
                    onValueChange={value => setValue(value[0])}
                    label="Limiar uso armazenamento de disco (%)"
                    sufix="%"
                />
                <InputSlider
                    minimumValue={60}
                    maximumValue={100}
                    value={value}
                    onValueChange={value => setValue(value[0])}
                    label="Limiar bateria (%)"
                    sufix="%"
                />
            </ScrollView>
            <View style={styles.footer}>
                <Button label="Salvar" onPress={() => console.log('salvou')} />
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
