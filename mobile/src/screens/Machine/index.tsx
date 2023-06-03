import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MachineCard } from '../../components/MachineCard';

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
        lastUpdate: '03/05/2023 às 16:51',
        uuid: '4qqdw848',
        name: 'jhonatancunha',
    },
];

export const MachineScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatListMachine}
                data={teste}
                renderItem={({ item }) => <MachineCard {...item} />}
                keyExtractor={item => item.uuid}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListMachine: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        width: '100%',
        gap: 20,
        marginBottom: 20,
    },
    separator: {
        height: 20,
    },
});
