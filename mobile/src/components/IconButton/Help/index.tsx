import { Alert, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../theme/colors';

interface IHelpIconButton {
    title: string;
    message: string;
}

export const HelpIconButton = ({ title, message }: IHelpIconButton) => {
    const showInformation = () => {
        Alert.alert(title, message);
    };

    return (
        <TouchableOpacity onPress={showInformation}>
            <MaterialCommunityIcons
                name="help-box"
                color={colors.white}
                size={35}
            />
        </TouchableOpacity>
    );
};

HelpIconButton.defaultProps = {
    title: 'Título',
    message: 'Descrição',
};
