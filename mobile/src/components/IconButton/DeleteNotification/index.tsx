import { useRoute } from '@react-navigation/native';
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
    const { params } = useRoute();

    const handleDeleteNotifications = async () => {
        try {
            await NotificationHelper.clear('1');
            params?.getNotifications();
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
