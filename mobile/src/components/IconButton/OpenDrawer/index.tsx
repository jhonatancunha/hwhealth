import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../../theme/colors';

export const OpenDrawerIconButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={navigation.openDrawer}>
            <Entypo name="menu" color={colors.white} size={35} />
        </TouchableOpacity>
    );
};

OpenDrawerIconButton.defaultProps = {
    title: 'Título',
    message: 'Descrição',
};
