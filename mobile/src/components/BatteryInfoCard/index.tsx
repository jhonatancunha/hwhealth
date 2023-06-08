import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineGraph } from '../LineGraph';

interface IBatteryInfoCard {
    charge: number;
    historyCharge: number[];
    timeLeft: string;
    powerPlugged: boolean;
}

// charge: 99.92877492877493,
// historyCharge: [100, 50, 60, 40, 80, 30, 99, 50],
// time_left: '-1:59:59',
// power_plugged: null,

export const BatteryInfoCard = ({
    charge,
    historyCharge,
    timeLeft,
    powerPlugged,
}: IBatteryInfoCard): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.card}>
            <Pressable
                style={styles.header}
                onPress={() => setOpen(prevState => !prevState)}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Bateria</Text>
                </View>
                <View style={styles.titleCpuPercentage}>
                    <Text style={styles.percentage}>{charge.toFixed(2)}%</Text>
                </View>
                <View style={styles.iconLeft}>
                    <FontAwesome
                        name={open ? 'chevron-up' : 'chevron-down'}
                        color="black"
                        size={25}
                    />
                </View>
            </Pressable>
            {open ? (
                <View style={styles.content}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Carga atual: </Text>
                        <Text style={styles.infoValue}>
                            {charge.toFixed(2)}%
                        </Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Tempo restante: </Text>
                        <Text style={styles.infoValue}>{timeLeft}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Carregando: </Text>
                        <Text style={styles.infoValue}>
                            {powerPlugged ? 'Sim' : 'Não'}
                        </Text>
                    </View>

                    <LineGraph data={historyCharge} legend="Carga da bateria" />
                </View>
            ) : null}
        </View>
    );
};

BatteryInfoCard.defaultProps = {
    charge: 99.92877492877493,
    historyCharge: [100, 50, 60, 40, 80, 30, 99, 50],
    timeLeft: '-1:59:59',
    powerPlugged: false,
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
        flexDirection: 'row',
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: 'black',
    },
    titleCpuPercentage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    percentage: {
        color: 'black',
    },
    iconLeft: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    infoValue: {
        fontWeight: 'bold',
        color: 'black',
    },
    text: {
        color: 'black',
    },
});
