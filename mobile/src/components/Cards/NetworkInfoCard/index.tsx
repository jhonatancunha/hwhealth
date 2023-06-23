import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../theme/colors';
import { LineGraph } from '../../LineGraph';

interface INetworkInfoCard {
    bytesSent: string;
    bytesReceived: string;
    historyPacketsSent: number[];
    historyPacketsReceived: number[];
    errorIn: number;
    errorOut: number;
    dropIn: number;
    dropOut: number;
    timeLabelsHistoryPacketsSent: string[];
    timeLabelsHistoryPacketsReceived: string[];
}

export const NetworkInfoCard = ({
    bytesSent,
    bytesReceived,
    historyPacketsSent,
    historyPacketsReceived,
    errorIn,
    errorOut,
    dropIn,
    dropOut,
    timeLabelsHistoryPacketsSent,
    timeLabelsHistoryPacketsReceived,
}: INetworkInfoCard): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.card}>
            <Pressable
                style={styles.header}
                onPress={() => setOpen(prevState => !prevState)}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Rede</Text>
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
                        <Text style={styles.text}>Bytes enviados: </Text>
                        <Text style={styles.infoValue}>{bytesSent}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Bytes recebidos: </Text>
                        <Text style={styles.infoValue}>{bytesReceived}</Text>
                    </View>

                    <LineGraph
                        data={historyPacketsSent}
                        legend="Quantidade pacotes enviados"
                        yAxisSuffix=""
                        labels={timeLabelsHistoryPacketsSent}
                    />

                    <LineGraph
                        data={historyPacketsReceived}
                        legend="Quantidade pacotes recebidos"
                        yAxisSuffix=""
                        labels={timeLabelsHistoryPacketsReceived}
                    />
                </View>
            ) : null}
        </View>
    );
};

NetworkInfoCard.defaultProps = {
    bytesSent: '93.7M',
    bytesReceived: '335.1M',
    historyPacketsSent: [100, 500, 600, 800, 10, 20],
    historyPacketsReceived: [5, 6, 40, 900, 20, 10],
    errorIn: 0,
    errorOut: 0,
    dropIn: 0,
    dropOut: 0,
    timeLabelsHistoryPacketsSent: [],
    timeLabelsHistoryPacketsReceived: [],
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
        color: colors.black,
        fontFamily: 'Inter-Black',
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
