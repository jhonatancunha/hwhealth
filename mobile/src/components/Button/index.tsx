import { useMemo } from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme/colors';

interface IButton {
    onPress: (e: GestureResponderEvent) => void;
    label: string;
    backgroundColor: string;
    labelColor: string;
}

export const Button = ({
    onPress,
    label,
    backgroundColor,
    labelColor,
}: IButton) => {
    const buttonStyle = useMemo(() => {
        return [styles.container, { backgroundColor: backgroundColor }];
    }, [backgroundColor]);

    const labelStyle = useMemo(() => {
        return [styles.label, { color: labelColor }];
    }, [labelColor]);

    return (
        <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.7}
            onPress={onPress}>
            <Text style={labelStyle}>{label}</Text>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    label: 'label',
    backgroundColor: colors.pink,
    labelColor: colors.white,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        borderRadius: 8,
    },
    label: {
        textAlign: 'center',
        fontFamily: 'Inter-Black',
    },
});
