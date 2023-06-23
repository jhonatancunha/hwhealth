import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../theme/colors';
import { LineGraph } from '../../LineGraph';

interface IMemoryRamInfoCard {
    total: string;
    available: string;
    percent: number;
    used: string;
    historyPercent: number[];
    timeLabelsHistoryPercent: string[];
}

export const MemoryRamInfoCard = ({
    total,
    available,
    percent,
    used,
    historyPercent,
    timeLabelsHistoryPercent,
}: IMemoryRamInfoCard): React.ReactElement => {
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
                        legend="Uso da memória RAM (%)"
                        yAxisSuffix="%"
                        labels={timeLabelsHistoryPercent}
                    />
                </View>
            ) : null}
        </View>
    );
};

MemoryRamInfoCard.defaultProps = {
    total: '15.5G',
    available: '9.1G',
    percent: 41,
    used: '5.0G',
    historyPercent: [41, 20, 90, 60, 40, 20, 30, 40],
    timeLabelsHistoryPercent: [],
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
        fontFamily: 'Inter-Black',
        color: colors.black,
    },
    titleCpuPercentage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    percentage: {
        color: colors.black,
        fontFamily: 'Inter-Black',
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
        color: colors.black,
        fontFamily: 'Inter-Bold',
    },
    text: {
        color: colors.black,
        fontFamily: 'Inter-Regular',
    },
});
