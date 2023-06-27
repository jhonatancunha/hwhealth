import { Alert, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NotificationHelper } from '../../../helper/notification-helper';
import { colors } from '../../../theme/colors';

interface IDeleteNotificationIconButton {
    title: string;
    message: string;
}

export const DeleteNotificationIconButton = ({
    title,
    message,
}: IDeleteNotificationIconButton) => {
    const handleDeleteNotifications = async () => {
        try {
            await NotificationHelper.clear('1');
        } catch (error) {
            console.log('error', error);
        }
    };

    const showInformation = () => {
        Alert.alert(title, message, [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'Confirmar', onPress: handleDeleteNotifications },
        ]);
    };

    return (
        <TouchableOpacity onPress={showInformation}>
            <MaterialCommunityIcons
                name="delete"
                color={colors.white}
                size={35}
            />
        </TouchableOpacity>
    );
};

DeleteNotificationIconButton.defaultProps = {
    title: 'Título',
    message: 'Descrição',
};
