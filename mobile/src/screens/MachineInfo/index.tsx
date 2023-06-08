import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CPUInfoCard } from '../../components/CPUInfoCard';
import { DiskInfoCard } from '../../components/DiskInfoCard';
import { MemoryRamInfoCard } from '../../components/MemoryRamInfoCard';
import { MemorySwapInfoCard } from '../../components/MemorySwapInfoCard';
import { UserInfoCard } from '../../components/UserInfoCard';

export const MachineInfo = () => {
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}>
            <UserInfoCard
                name={info.user_info.name}
                uuid={info.user_info.uuid}
                osName={info.user_info.os_name}
                osRelease={info.user_info.os_release}
                osArchitecture={info.user_info.os_architecture}
                osVersion={info.user_info.os_version}
            />
            <CPUInfoCard
                cpuCount={info.cpu.cpu_count}
                cpuMeanPercentage={info.cpu.cpu_mean_percentage}
                historyCpuPercentage={info.cpu.cpu_percentage}
                temperatureUnit={info.cpu.temperature_unit}
                cpuMeanTemperature={info.cpu.cpu_mean_temperature}
                historyCpuTemperature={info.cpu.cpu_temperature}
            />
            <MemoryRamInfoCard
                total={info.memory_ram.total}
                available={info.memory_ram.available}
                percent={info.memory_ram.percent}
                used={info.memory_ram.used}
                historyPercent={info.memory_ram.history_percent}
            />

            <MemorySwapInfoCard
                total={info.swap_memory.total}
                percent={info.swap_memory.percent}
                used={info.swap_memory.used}
                historyPercent={info.swap_memory.history_percent}
            />

            <DiskInfoCard
                total={info.disk.total}
                percent={info.disk.percent}
                used={info.disk.used}
                historyPercent={info.disk.history_percent}
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
        cpu_percentage: [19.7, 17.5, 16.5, 17.8, 13.2, 21.2, 16.0, 16.7],
        temperature_unit: 'celsius',
        cpu_mean_temperature: 50.2,
        cpu_temperature: [54.0, 49.0, 50.0, 49.0, 49.0],
    },
    memory_ram: {
        total: '15.5G',
        available: '9.1G',
        percent: 41,
        used: '5.0G',
        free: '3.9G',
        history_percent: [41, 20, 90, 60, 40, 20, 30, 40],
    },
    swap_memory: {
        total: '1.9G',
        used: '0.0B',
        free: '1.9G',
        percent: 0,
        history_percent: [0, 1.9, 1.2, 0.2, 0, 0, 0.5, 0],
    },
    disk: {
        free: '27.7G',
        percent: 55,
        total: '64.9G',
        used: '33.9G',
        history_percent: [41, 20, 90, 60, 40, 20, 30, 40],
    },
    network: {
        bytes_sent: '93.7M',
        bytes_received: '335.1M',
        packets_sent: 271199,
        packets_received: 388247,
        error_in: 0,
        error_out: 0,
        drop_in: 0,
        drop_out: 0,
    },
    battery: {
        charge: 99.92877492877493,
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
