import { useMemo } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { colors } from '../../theme/colors';
import { INotification } from '../../screens/Notifications';
import { Button } from '../Button';
import { useNavigation } from '@react-navigation/native';

interface IModal {
    visible: boolean;
    closeModal: () => void;
    modalInfo: INotification | null;
}

export const NotificationModalComponent = ({
    visible,
    closeModal,
    modalInfo,
}: IModal) => {
    const navigation = useNavigation();

    if (!modalInfo) return;

    const handleNavigateMachine = () => {
        closeModal();
        navigation.navigate('MachineInfo', {
            machine_id: modalInfo.machine_id,
        });
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={closeModal}>
                <Pressable style={styles.modalWrapper} onPress={closeModal}>
                    <ScrollView
                        directionalLockEnabled={true}
                        contentContainerStyle={styles.scrollModal}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>{modalInfo.title}</Text>

                            <Text style={styles.text}>{modalInfo.message}</Text>
                            <Button
                                onPress={handleNavigateMachine}
                                label="Ver máquina"
                            />
                        </View>
                    </ScrollView>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 10,
    },
    image: {
        height: 150,
        width: 150,
        marginVertical: 20,
    },
    title: {
        color: colors.black,
        fontFamily: 'Inter-Black',
    },
    text: {
        color: colors.black,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
    scrollModal: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
