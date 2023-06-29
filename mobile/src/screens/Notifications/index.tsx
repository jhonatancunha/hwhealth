import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NotificationCard } from '../../components/Cards/NotificationCard';
import { NotificationModalComponent } from '../../components/Modal/notification';
import { api } from '../../services/axios';

export interface INotification {
    _id: string;
    user_id: string;
    machine_id: string;
    title: string;
    message: string;
}

export const NotificationScreen = () => {
    const [notifications, setNotifications] = useState<INotification[] | []>(
        [],
    );

    const [modalVisible, setModalVisibility] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<INotification | null>(null);

    const tabBarHeight = useBottomTabBarHeight();

    const customFlatListStyle = useMemo(
        () => [
            styles.flatList,
            {
                marginBottom: tabBarHeight,
            },
        ],
        [tabBarHeight],
    );

    const getNotifications = useCallback(async () => {
        try {
            const { data } = await api.get('/notification');

            setNotifications(data);
        } catch (error) {
            console.log('Erro ao buscar notificações!', { ...error });
        }
    }, []);

    const closeModal = () => {
        setModalVisibility(false);
    };

    const openModal = () => {
        setModalVisibility(true);
    };

    const handlePressNotificationCard = (data: INotification) => {
        setModalInfo(data);
        openModal();
    };

    useFocusEffect(
        useCallback(() => {
            getNotifications();
        }, [getNotifications]),
    );

    return (
        <View style={styles.container}>
            <NotificationModalComponent
                visible={modalVisible}
                closeModal={closeModal}
                modalInfo={modalInfo}
            />
            <FlatList
                style={customFlatListStyle}
                data={notifications}
                renderItem={({ item }) => (
                    <NotificationCard
                        data={item}
                        onPress={handlePressNotificationCard}
                    />
                )}
                keyExtractor={(item: INotification) => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={styles.separator} />}
                scrollEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    separator: {
        height: 20,
    },
});
