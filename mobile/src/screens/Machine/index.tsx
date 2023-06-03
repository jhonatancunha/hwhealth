import { Layout } from '@ui-kitten/components';
import React from 'react';
import { MachineCard } from '../../components/MachineCard';

export const MachineScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MachineCard />
    </Layout>
);
