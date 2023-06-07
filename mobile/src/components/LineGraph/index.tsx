import { useState } from 'react';
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
    data: LineChartData;
    height: number;
    verticalLabelRotation: number;
    yAxisLabel: string;
    yAxisSuffix: string;
}

export const LineGraph = ({
    data,
    height,
    verticalLabelRotation,
    yAxisLabel,
    yAxisSuffix,
}: ILineGraph) => {
    const [width, setWidth] = useState(0);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };

    return (
        <View style={styles.cardContainer} onLayout={handleLayout}>
            {width ? (
                <LineChart
                    data={data}
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
    data: {
        labels: [],
        datasets: [
            {
                data: [54.0, 49.0, 50.0, 49.0, 49.0],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
        ],
        legend: ['Historico Temperatura Processador'], // optional
    },
    height: 256,
    verticalLabelRotation: 30,
    yAxisLabel: '',
    yAxisSuffix: '°C',
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
    },
});
