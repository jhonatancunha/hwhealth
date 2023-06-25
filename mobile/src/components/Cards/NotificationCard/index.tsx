import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { colors } from '../../../theme/colors';

interface INotificationCard {
    data: OSNotification;
    onPress: (notification: OSNotification) => void;
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
                {data?.subtitle ? (
                    <View style={styles.cardHeader}>
                        <Text style={styles.infoValue}>{data.subtitle}</Text>
                    </View>
                ) : null}
                <View style={styles.cardContentWrapper}>
                    <Text style={styles.text}>{data.body}</Text>
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
