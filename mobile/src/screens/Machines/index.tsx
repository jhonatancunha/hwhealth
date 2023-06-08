import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MachineCard } from '../../components/Cards/MachineCard';

export const MachineScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();

    const customFlatListStyle = useMemo(
        () => [
            styles.flatListMachine,
            {
                marginBottom: tabBarHeight,
            },
        ],
        [tabBarHeight],
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={customFlatListStyle}
                data={teste}
                renderItem={({ item }) => <MachineCard {...item} />}
                keyExtractor={item => item.uuid}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={styles.separator} />}
                scrollEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListMachine: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    separator: {
        height: 20,
    },
});

const teste = [
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '48848',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '4884dw8',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '48dw848',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '48ddaw848',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '48dwdw848',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '48dww848',
        name: 'jhonatancunha',
    },
    {
        so: 'Linux',
        release: '5.15.0-73-generic',
        arch: 'x86_64',
        lastUpdate: 'dawdadw',
        uuid: '4qqdw848',
        name: 'jhonatancunha',
    },
];
