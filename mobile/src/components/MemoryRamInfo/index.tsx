import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineGraph } from '../LineGraph';

interface IMemoryRamInfo {
    total: string;
    available: string;
    percent: number;
    used: string;
    historyPercent: number[];
}

// total: '15.5G',
//     available: '9.1G',
//     percent: 41,
//     used: '5.0G',
//     historyPercent: [41, 20, 90, 60, 40, 20, 30, 40],

export const MemoryRamInfo = ({
    total,
    available,
    percent,
    used,
    historyPercent,
}: IMemoryRamInfo): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.card}>
            <Pressable
                style={styles.header}
                onPress={() => setOpen(prevState => !prevState)}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Memória RAM</Text>
                </View>
                <View style={styles.titleCpuPercentage}>
                    <Text style={styles.percentage}>{used}</Text>
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
                        <Text style={styles.text}>Total: </Text>
                        <Text style={styles.infoValue}>{total}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Disponível: </Text>
                        <Text style={styles.infoValue}>{available}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Usado: </Text>
                        <Text style={styles.infoValue}>{used}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Porcentagem de uso: </Text>
                        <Text style={styles.infoValue}>{percent}%</Text>
                    </View>

                    <LineGraph
                        data={historyPercent}
                        legend="Historico Uso Memória RAM"
                    />
                </View>
            ) : null}
        </View>
    );
};

MemoryRamInfo.defaultProps = {
    total: '15.5G',
    available: '9.1G',
    percent: 41,
    used: '5.0G',
    historyPercent: [41, 20, 90, 60, 40, 20, 30, 40],
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
