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

interface IModal {
    visible: boolean;
    closeModal: () => void;
    modalInfo: OSNotification | null;
}

export const NotificationModalComponent = ({
    visible,
    closeModal,
    modalInfo,
}: IModal) => {
    const image = useMemo(
        () => ({
            uri: modalInfo?.bigPicture,
        }),
        [modalInfo],
    );

    if (!modalInfo) return;

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
                            {modalInfo?.bigPicture ? (
                                <Image style={styles.image} source={image} />
                            ) : null}
                            <Text style={styles.text}>{modalInfo.body}</Text>
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
    },
    scrollModal: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
