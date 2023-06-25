import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';

interface IUserInfoCard {
    name: string;
    uuid: number;
    osName: string;
    osRelease: string;
    osArchitecture: string;
    osVersion: string;
}

export const UserInfoCard = ({
    name,
    uuid,
    osName,
    osRelease,
    osArchitecture,
    osVersion,
}: IUserInfoCard): React.ReactElement => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Informações da Máquina</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>UUID: </Text>
                    <Text style={styles.infoValue}>{uuid}</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>Usuário: </Text>
                    <Text style={styles.infoValue}>{name}</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>Sistema Operacional: </Text>
                    <Text style={styles.infoValue}>{osName}</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>Release: </Text>
                    <Text style={styles.infoValue}>{osRelease}</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>Arquitetura: </Text>
                    <Text style={styles.infoValue}>{osArchitecture}</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.text}>Versão: </Text>
                    <Text
                        style={styles.infoValue}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {osVersion}
                    </Text>
                </View>
            </View>
        </View>
    );
};

UserInfoCard.defaultProps = {
    name: 'jhonatancunha',
    uuid: 9447197259786,
    osName: 'Linux',
    osRelease: '5.15.0-73-generic',
    osArchitecture: 'x86_64',
    osVersion: '#80~20.04.1-Ubuntu SMP Wed May 17 14:58:14 UTC 2023',
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 5,
    },
    content: {
        padding: 10,
        gap: 5,
    },
    header: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 2,
        barderColor: colors.black,
    },
    title: {
        color: colors.black,
        fontFamily: 'Inter-Black',
    },
    infoWrapper: {
        flexDirection: 'row',
    },
    infoValue: {
        color: colors.black,
        flex: 1,
        fontFamily: 'Inter-Bold',
    },
    text: {
        color: colors.black,
        fontFamily: 'Inter-Regular',
    },
});
