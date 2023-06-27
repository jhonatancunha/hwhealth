import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BatteryInfoCard } from '../../components/Cards/BatteryInfoCard';
import { CPUInfoCard } from '../../components/Cards/CPUInfoCard';
import { DiskInfoCard } from '../../components/Cards/DiskInfoCard';
import { MemoryRamInfoCard } from '../../components/Cards/MemoryRamInfoCard';
import { MemorySwapInfoCard } from '../../components/Cards/MemorySwapInfoCard';
import { NetworkInfoCard } from '../../components/Cards/NetworkInfoCard';
import { api } from '../../services/axios';

interface IMachineInfo {
    user_info: {
        uuid: number,
        username: string,
        os_name: string,
        os_release: string,
        os_architecture: string,
        os_version: string,
        _id: string,
    };
    fans: {
        size_fans: number,
        array_fans: number[],
    };
    cpu: {
        cpu_count: number,
        cpu_mean_percentage: number,
        history_cpu_percentage: number[],
        time_labels_cpu_percentage: string[],
        temperature_unit: string,
        cpu_mean_temperature: number,
        history_cpu_temperature: number[],
        time_labels_cpu_temperature: string[],
    };
    memory_ram: {
        total: string,
        available: string,
        percent: number,
        used: string,
        free: string,
        history_percent: number[],
        time_labels_history_percent: string[],
    };
    swap_memory: {
        total: string,
        used: string,
        free: string,
        percent: number,
        history_percent: number[],
        time_labels_history_percent: string[],
    };
    disk: {
        free: string,
        percent: number,
        total: string,
        used: string,
        history_percent: number[],
        time_labels_history_percent: string[],
    };
    network: {
        bytes_sent: string,
        bytes_received: string,
        history_packets_sent: number[],
        time_labels_history_packets_sent: string[],
        history_packets_received: number[],
        time_labels_history_packets_received: string[],
        error_in: number,
        error_out: number,
        drop_in: number,
        drop_out: number,
    };
    battery: {
        charge: number,
        history_charge: number[],
        time_labels_history_charge: string[],
        time_left: string,
        power_plugged: boolean | null,
    };
    created_at: string;
}

export const MachineInfo = ({ route }) => {
    const { params } = route;
    const { machine_id } = params;

    console.log('machine_id', machine_id);

    const [machineInfo, setMachineInfo] = useState<IMachineInfo | null>(null);

    const getMachineInfo = useCallback(async () => {
        try {
            const { data } = await api.get(`/machine/${machine_id}`);

            setMachineInfo(data.data[0]);
        } catch (error) {
            Alert.alert(
                'Erro',
                'Ocorreu algum problema ao buscar informações sobre a máquina. Por favor, contate o administrador do sistema.',
            );
        }
    }, [machine_id]);

    useFocusEffect(
        useCallback(() => {
            getMachineInfo();
        }, [getMachineInfo]),
    );

    if (!machineInfo) {
        return <ActivityIndicator />;
    }

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}>
            {/* <UserInfoCard
                name={machineInfo.user_info.username}
                uuid={machineInfo.user_info.uuid}
                osName={machineInfo.user_info.os_name}
                osRelease={machineInfo.user_info.os_release}
                osArchitecture={machineInfo.user_info.os_architecture}
                osVersion={machineInfo.user_info.os_version}
            /> */}
            <CPUInfoCard
                cpuCount={machineInfo.cpu.cpu_count}
                cpuMeanPercentage={machineInfo.cpu.cpu_mean_percentage}
                historyCpuPercentage={machineInfo.cpu.history_cpu_percentage}
                temperatureUnit={machineInfo.cpu.temperature_unit}
                cpuMeanTemperature={machineInfo.cpu.cpu_mean_temperature}
                historyCpuTemperature={machineInfo.cpu.history_cpu_temperature}
                timeLabelsCpuTemperature={
                    machineInfo.cpu.time_labels_cpu_temperature
                }
                timeLabelsCpuPercentage={
                    machineInfo.cpu.time_labels_cpu_percentage
                }
            />
            <MemoryRamInfoCard
                total={machineInfo.memory_ram.total}
                available={machineInfo.memory_ram.available}
                percent={machineInfo.memory_ram.percent}
                used={machineInfo.memory_ram.used}
                historyPercent={machineInfo.memory_ram.history_percent}
                timeLabelsHistoryPercent={
                    machineInfo.memory_ram.time_labels_history_percent
                }
            />

            <MemorySwapInfoCard
                total={machineInfo.swap_memory.total}
                percent={machineInfo.swap_memory.percent}
                used={machineInfo.swap_memory.used}
                historyPercent={machineInfo.swap_memory.history_percent}
                timeLabelsHistoryPercent={
                    machineInfo.swap_memory.time_labels_history_percent
                }
            />

            <DiskInfoCard
                total={machineInfo.disk.total}
                percent={machineInfo.disk.percent}
                used={machineInfo.disk.used}
                historyPercent={machineInfo.disk.history_percent}
                timeLabelsHistoryPercent={
                    machineInfo.disk.time_labels_history_percent
                }
            />

            <NetworkInfoCard
                bytesSent={machineInfo.network.bytes_sent}
                bytesReceived={machineInfo.network.bytes_received}
                historyPacketsSent={machineInfo.network.history_packets_sent}
                historyPacketsReceived={
                    machineInfo.network.history_packets_received
                }
                errorIn={machineInfo.network.error_in}
                errorOut={machineInfo.network.error_out}
                dropIn={machineInfo.network.drop_in}
                dropOut={machineInfo.network.drop_out}
                timeLabelsHistoryPacketsSent={
                    machineInfo.network.time_labels_history_packets_sent
                }
                timeLabelsHistoryPacketsReceived={
                    machineInfo.network.time_labels_history_packets_received
                }
            />

            <BatteryInfoCard
                charge={machineInfo.battery.charge}
                historyCharge={machineInfo.battery.history_charge}
                timeLeft={machineInfo.battery.time_left}
                powerPlugged={Boolean(machineInfo.battery.power_plugged)}
                timeLabelsHistoryCharge={
                    machineInfo.battery.time_labels_history_charge
                }
            />
        </ScrollView>
    );
};

const info = {
    user_info: {
        name: 'jhonatancunha',
        uuid: 9447197259786,
        os_name: 'Linux',
        os_release: '5.15.0-73-generic',
        os_architecture: 'x86_64',
        os_version: '#80~20.04.1-Ubuntu SMP Wed May 17 14:58:14 UTC 2023',
    },
    fans: {
        size_fans: 0,
        array_fans: [],
    },
    cpu: {
        cpu_count: 8,
        cpu_mean_percentage: 17.325,
        history_cpu_percentage: [19.7, 17.5, 16.5, 17.8, 13.2],
        time_labels_cpu_percentage: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
        temperature_unit: 'celsius',
        cpu_mean_temperature: 50.2,
        history_cpu_temperature: [54.0, 49.0, 50.0, 49.0, 49.0],
        time_labels_cpu_temperature: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
    },
    memory_ram: {
        total: '15.5G',
        available: '9.1G',
        percent: 41,
        used: '5.0G',
        free: '3.9G',
        history_percent: [41, 20, 90, 60, 40],
        time_labels_history_percent: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
    },
    swap_memory: {
        total: '1.9G',
        used: '0.0B',
        free: '1.9G',
        percent: 0,
        history_percent: [0, 1.9, 1.2, 0.2, 0],
        time_labels_history_percent: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
    },
    disk: {
        free: '27.7G',
        percent: 55,
        total: '64.9G',
        used: '33.9G',
        history_percent: [41, 20, 90, 60, 40],
        time_labels_history_percent: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
    },
    network: {
        bytes_sent: '93.7M',
        bytes_received: '335.1M',
        history_packets_sent: [100, 500, 600, 800, 10],
        time_labels_history_packets_sent: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
        history_packets_received: [5, 6, 40, 900, 20],
        time_labels_history_packets_received: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
        error_in: 0,
        error_out: 0,
        drop_in: 0,
        drop_out: 0,
    },
    battery: {
        charge: 99.92877492877493,
        history_charge: [100, 50, 60, 40, 80],
        time_labels_history_charge: [
            '14:14',
            '15:20',
            '15:60',
            '17:60',
            '18:20',
        ],
        time_left: '-1:59:59',
        power_plugged: null,
    },
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        gap: 20,
    },
});
