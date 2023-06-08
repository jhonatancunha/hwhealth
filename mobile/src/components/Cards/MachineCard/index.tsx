import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IMachineCard {
    so: string;
    release: string;
    arch: string;
    lastUpdate: string;
    name: string;
    uuid: string;
}

export const MachineCard = ({
    so,
    release,
    arch,
    lastUpdate,
    name,
    uuid,
}: IMachineCard): React.ReactElement => {
    const navigation = useNavigation();

    const goToMachineInfo = () => {
        navigation.navigate('MachineInfo');
    };

    return (
        <TouchableOpacity style={styles.topContainer} onPress={goToMachineInfo}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}>#{uuid}</Text>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.cardContentWrapper}>
                    <View style={styles.cardContentRight}>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>
                                Sistema Operacional:{' '}
                            </Text>
                            <Text style={styles.infoValue}>{so}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>Release: </Text>
                            <Text style={styles.infoValue}>{release}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.text}>Arquitetura: </Text>
                            <Text style={styles.infoValue}>{arch}</Text>
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
                        <Text style={styles.infoValue}>{lastUpdate}</Text>
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
    },
    card: {
        flex: 1,
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
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        width: 40,
        height: 40,
    },
    text: {
        color: 'black',
    },
});
