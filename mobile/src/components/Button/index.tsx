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
}

export const Button = ({ onPress, label }: IButton) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    label: 'label',
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        borderRadius: 8,
        backgroundColor: colors.pink,
    },
    label: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
