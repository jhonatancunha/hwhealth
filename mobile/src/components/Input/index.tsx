import { forwardRef } from 'react';
import {
    NativeSyntheticEvent,
    ReturnKeyTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextInputChangeEventData,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';

interface IInput {
    onChange:
        | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
        | undefined;
    placeholder: string;
    secureTextEntry?: boolean;
    returnKeyType?: ReturnKeyTypeOptions | undefined;
    label: string;
}
// eslint-disable-next-line react/display-name
export const Input = forwardRef((props: IInput, _) => {
    const { label, placeholder, secureTextEntry, returnKeyType, ...rest } =
        props;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                cursorColor={colors.black}
                placeholderTextColor={colors.blackRGBA(0.3)}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                returnKeyType={returnKeyType}
                {...rest}
            />
        </View>
    );
});

Input.defaultProps = {
    secureTextEntry: false,
    returnKeyType: 'done',
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 0,
        color: colors.black,
        fontFamily: 'Inter-Regular',
    },
    label: {
        marginLeft: 8,
        marginBottom: 5,
        fontFamily: 'Inter-Medium',
    },
});
