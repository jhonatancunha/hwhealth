import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IHeader {
    title: string;
    goBackButton: boolean;
    configurationButton: boolean;
    rightButton: React.ReactElement;
}

export function Header({
    title,
    goBackButton,
    configurationButton,
    rightButton,
}: IHeader) {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;

    const goToSettings = () => {
        navigation.navigate('MachineConfiguration', params);
    };

    return (
        <View style={styles.container}>
            {goBackButton ? (
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.goBackButton}>
                    <Ionicons
                        name="arrow-back-circle"
                        color="black"
                        size={35}
                    />
                </TouchableOpacity>
            ) : null}
            <Text style={styles.title}>{title}</Text>
            {configurationButton ? (
                <TouchableOpacity
                    onPress={goToSettings}
                    style={styles.settingsButton}>
                    <Ionicons name="settings" color="black" size={35} />
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
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
    },
    settingsButton: {},
    goBackButton: {},
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
});
