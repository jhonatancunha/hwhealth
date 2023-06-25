import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

interface IHeader {
    title: string;
    goBackButton: boolean;
    configurationButton: boolean;
    rightButton: React.ReactElement;
    leftButton: React.ReactElement;
}

export function Header({
    title,
    goBackButton,
    configurationButton,
    rightButton,
    leftButton,
}: IHeader) {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;

    const goToSettings = () => {
        navigation.navigate('MachineConfiguration', params);
    };

    return (
        <View style={styles.container}>
            {leftButton ? leftButton : null}
            {goBackButton ? (
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.goBackButton}>
                    <Ionicons
                        name="arrow-back-circle"
                        color={colors.white}
                        size={35}
                    />
                </TouchableOpacity>
            ) : null}
            <Text style={styles.title}>{title}</Text>
            {configurationButton ? (
                <TouchableOpacity
                    onPress={goToSettings}
                    style={styles.settingsButton}>
                    <Ionicons name="settings" color={colors.white} size={35} />
                </TouchableOpacity>
            ) : null}
            {rightButton ? rightButton : null}
        </View>
    );
}

Header.defaultProps = {
    title: '',
    goBackButton: false,
    configurationButton: false,
    rightButton: null,
    leftButton: null,
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: colors.black,
    },
    settingsButton: {},
    goBackButton: {},
    title: {
        color: colors.white,
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
    },
});
