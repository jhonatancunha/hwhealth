import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { colors } from '../../../theme/colors';
import { INotification } from '../../../screens/Notifications';

interface INotificationCard {
    data: INotification;
    onPress: (notification: INotification) => void;
}

export const NotificationCard = ({
    data,
    onPress,
}: INotificationCard): React.ReactElement => {
    const handlePress = () => {
        onPress(data);
    };

    return (
        <TouchableOpacity style={styles.topContainer} onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.infoValue}>{data.title}</Text>
                </View>

                <View style={styles.cardContentWrapper}>
                    <Text style={styles.text}>{data.message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 3,
        borderColor: colors.black,
        padding: 10,
        borderRadius: 6,
    },
    card: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        paddingVertical: 5,
        width: '80%',
    },
    cardContentWrapper: {
        flexDirection: 'row',
        gap: 20,
    },
    infoValue: {
        color: colors.black,
        fontFamily: 'Inter-Bold',
    },
    text: {
        color: colors.black,
        fontFamily: 'Inter-Regular',
    },
});
