import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { NotificationCard } from '../../components/Cards/NotificationCard';
import { NotificationModalComponent } from '../../components/Modal/notification';
import { NotificationHelper } from '../../helper/notification-helper';

export const NotificationScreen = () => {
    const [notifications, setNotifications] = useState<OSNotification[] | []>(
        [],
    );

    const [modalVisible, setModalVisibility] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<OSNotification | null>(null);

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

    const getNotifications = async () => {
        try {
            const data = await NotificationHelper.getItem('1');
            setNotifications(data);
        } catch (error) {
            console.log('Erro ao buscar notificações!');
        }
    };

    const closeModal = () => {
        setModalVisibility(false);
    };

    const openModal = () => {
        setModalVisibility(true);
    };

    const handlePressNotificationCard = (data: OSNotification) => {
        setModalInfo(data);
        openModal();
    };

    useFocusEffect(
        useCallback(() => {
            getNotifications();
        }, []),
    );

    console.log('modalVisible', modalVisible);

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
                keyExtractor={(item: OSNotification) => item.notificationId}
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
