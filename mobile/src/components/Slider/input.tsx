import { Slider } from '@miblanchard/react-native-slider';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';
import { StyleSheet, Text, View } from 'react-native';

interface IInputSlider {
    maximumValue: number;
    minimumValue: number;
    step: number;
    onValueChange: SliderOnChangeCallback;
    value: number;
    label: string;
    sufix: string;
}

export const InputSlider = ({
    maximumValue,
    minimumValue,
    step,
    onValueChange,
    value,
    label,
    sufix,
}: IInputSlider) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Slider
                animateTransitions
                thumbTintColor="#1a9274"
                maximumTrackTintColor="#d3d3d3"
                minimumTrackTintColor="#1fb28a"
                maximumValue={maximumValue}
                minimumValue={minimumValue}
                step={step}
                value={value}
                onValueChange={onValueChange}
            />
            <Text style={styles.value}>
                {value}
                {sufix}
            </Text>
        </View>
    );
};

InputSlider.defaultProps = {
    label: 'Label',
    maximumValue: 100,
    minimumValue: 60,
    step: 1,
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
    label: {
        color: 'black',
    },
    value: {
        color: 'black',
        textAlign: 'right',
    },
});
