import { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    LayoutChangeEvent,
    StyleSheet,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

const chartConfig: AbstractChartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        fill: '#ffa726',
        stroke: '#e26a00',
    },
};

interface ILineGraph {
    data: number[];
    height: number;
    verticalLabelRotation: number;
    yAxisLabel: string;
    yAxisSuffix: string;
    legend: string;
    labels: string[];
}

export const LineGraph = ({
    data,
    height,
    verticalLabelRotation,
    yAxisLabel,
    yAxisSuffix,
    legend,
    labels,
}: ILineGraph) => {
    const [width, setWidth] = useState(0);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };

    const formattedData: LineChartData = useMemo(
        () => ({
            labels: labels,
            datasets: [
                {
                    data,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2, // optional
                },
            ],
            legend: [legend],
        }),
        [data, legend, labels],
    );

    return (
        <View style={styles.cardContainer} onLayout={handleLayout}>
            {width ? (
                <LineChart
                    data={formattedData}
                    width={width}
                    height={height}
                    verticalLabelRotation={verticalLabelRotation}
                    chartConfig={chartConfig}
                    yAxisLabel={yAxisLabel}
                    yAxisSuffix={yAxisSuffix}
                    bezier
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
};

LineGraph.defaultProps = {
    data: [54.0, 49.0, 50.0, 49.0, 49.0],
    height: 256,
    verticalLabelRotation: 0,
    yAxisLabel: '',
    yAxisSuffix: '°C',
    legend: 'Historico Temperatura Processador',
    labels: [],
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
    },
});
