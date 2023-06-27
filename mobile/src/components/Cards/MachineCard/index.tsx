import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../theme/colors';

interface IMachineCard {
    os_name: string;
    os_release: string;
    os_architecture: string;
    last_update: string;
    username: string;
    uuid: number;
    machine_id: string;
}

export const MachineCard = ({
    os_name,
    os_release,
    os_architecture,
    last_update,
    username,
    uuid,
    machine_id,
}: IMachineCard): React.ReactElement => {
    const navigation = useNavigation();

    const goToMachineInfo = () => {
        navigation.navigate('MachineInfo', {
            machine_id,
        });
    };

    return (
        <TouchableOpacity style={styles.topContainer} onPress={goToMachineInfo}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text
                        style={styles.text}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        #{uuid} -{' '}
                    </Text>
                    <Text
                        style={styles.text}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {username}
                    </Text>
                </View>
                <View style={styles.cardContentWrapper}>
                    <View style={styles.cardContentRight}>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>
                                Sistema Operacional:{' '}
                            </Text>
                            <Text style={styles.infoValue}>{os_name}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>Release: </Text>
                            <Text style={styles.infoValue}>{os_release}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>Arquitetura: </Text>
                            <Text style={styles.infoValue}>
                                {os_architecture}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardContentLeft}>
                        <FontAwesome
                            name="chevron-right"
                            color="black"
                            size={25}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Última atualização: </Text>
                        <Text style={styles.infoValue}>{last_update}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

MachineCard.defaultProps = {
    so: 'Linux',
    release: '5.15.0-73-generic',
    arch: 'x86_64',
    lastUpdate: '03/05/2023 às 16:51',
    uuid: '48848',
    name: 'jhonatancunha',
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
    cardContentRight: {
        justifyContent: 'center',
        flex: 1,
    },
    cardContentLeft: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    infoValue: {
        color: colors.black,
        fontFamily: 'Inter-Bold',
    },
    icon: {
        width: 40,
        height: 40,
    },
    text: {
        color: colors.black,
        fontFamily: 'Inter-Regular',
    },
});
