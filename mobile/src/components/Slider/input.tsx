import { Slider } from '@miblanchard/react-native-slider';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface IInputSlider {
    maximumValue: number;
    minimumValue: number;
    step: number;
    onValueChange: (value: number) => void;
    label: string;
    sufix: string;
    value: number;
}

// eslint-disable-next-line react/display-name
export const InputSlider = forwardRef((props: IInputSlider, _) => {
    const {
        maximumValue,
        minimumValue,
        step,
        onValueChange,
        label,
        sufix,
        value,
        ...rest
    } = props;

    const handleOnChange: SliderOnChangeCallback = values => {
        onValueChange(values[0]);
    };
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Slider
                {...rest}
                animateTransitions
                thumbTintColor={colors.pink}
                maximumTrackTintColor={colors.white}
                minimumTrackTintColor={colors.pink}
                maximumValue={maximumValue}
                minimumValue={minimumValue}
                step={step}
                value={value}
                onValueChange={handleOnChange}
            />
            <Text style={styles.value}>
                {value}
                {sufix}
            </Text>
        </View>
    );
});

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
        color: colors.black,
    },
    value: {
        color: colors.black,
        textAlign: 'right',
    },
});
