import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { MachineCard } from '../../components/Cards/MachineCard';
import { api } from '../../services/axios';

interface IMachine {
    os_name: string;
    os_release: string;
    os_architecture: string;
    os_version: string;
    username: string;
    last_update: string;
    machine_id: string;
}

export const MachineScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const [machines, setMachines] = useState<IMachine[]>([]);

    const customFlatListStyle = useMemo(
        () => [
            styles.flatListMachine,
            {
                marginBottom: tabBarHeight,
            },
        ],
        [tabBarHeight],
    );

    const fetchMachines = async () => {
        try {
            const { data } = await api.get('/machine');

            setMachines(
                data.map(item => ({
                    ...item.user_info,
                    machine_id: item._id,
                })),
            );
        } catch (error) {
            Alert.alert(
                'Erro',
                'Ocorreu algum problema ao buscar máquinas. Por favor, contate o administrador do sistema.',
            );
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMachines();
        }, []),
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={customFlatListStyle}
                data={machines}
                renderItem={({ item }) => <MachineCard {...item} />}
                keyExtractor={item => item.machine_id}
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
