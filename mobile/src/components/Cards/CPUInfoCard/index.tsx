import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineGraph } from '../../LineGraph';

interface ICPUInfoCard {
    cpuCount: number;
    cpuMeanPercentage: number;
    historyCpuPercentage: number[];
    temperatureUnit: string;
    cpuMeanTemperature: number;
    historyCpuTemperature: number[];
    timeLabelsCpuTemperature: string[];
    timeLabelsCpuPercentage: string[];
}

export const CPUInfoCard = ({
    cpuCount,
    cpuMeanPercentage,
    historyCpuPercentage,
    temperatureUnit,
    cpuMeanTemperature,
    historyCpuTemperature,
    timeLabelsCpuTemperature,
    timeLabelsCpuPercentage,
}: ICPUInfoCard): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.card}>
            <Pressable
                style={styles.header}
                onPress={() => setOpen(prevState => !prevState)}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Processador</Text>
                </View>
                <View style={styles.titleCpuPercentage}>
                    <Text style={styles.percentage}>
                        {cpuMeanTemperature} °C
                    </Text>
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
                        <Text style={styles.text}>Temperatura média: </Text>
                        <Text style={styles.infoValue}>
                            {cpuMeanTemperature}°C
                        </Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>Uso médio: </Text>
                        <Text style={styles.infoValue}>
                            {cpuMeanPercentage}%
                        </Text>
                    </View>

                    <LineGraph
                        data={historyCpuTemperature}
                        legend="Temperatura processador (°C)"
                        yAxisSuffix="°C"
                        labels={timeLabelsCpuTemperature}
                    />

                    <LineGraph
                        data={historyCpuPercentage}
                        legend="Uso processador (%)"
                        yAxisSuffix="%"
                        labels={timeLabelsCpuPercentage}
                    />
                </View>
            ) : null}
        </View>
    );
};

CPUInfoCard.defaultProps = {
    cpuCount: 8,
    cpuMeanPercentage: 17.325,
    historyCpuPercentage: [19.7, 17.5, 16.5, 17.8, 13.2, 21.2, 16.0, 16.7],
    temperatureUnit: 'celsius',
    cpuMeanTemperature: 50.2,
    historyCpuTemperature: [
        54.0, 49.0, 50.0, 49.0, 49.0, 49.0, 49.0, 49.0, 49.0, 49.0,
    ],
    timeLabelsCpuTemperature: [
        '14:14',
        '15:20',
        '15:60',
        '17:60',
        '18:20',
        '14:14',
        '15:20',
        '15:60',
        '17:60',
        '18:20',
    ],
    timeLabelsCpuPercentage: [
        '14:14',
        '15:20',
        '15:60',
        '17:60',
        '18:20',
        '14:14',
        '15:20',
        '15:60',
        '17:60',
        '18:20',
    ],
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
