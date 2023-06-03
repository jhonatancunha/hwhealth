import { Card, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Icon } from 'react-native-eva-icons';

interface IMachineCard {
    so: string;
    release: string;
    arch: string;
    lastUpdate: string;
    name: string;
    uuid: string;
}

interface IFooter extends ViewProps {
    lastUpdate: string;
}

interface IHeader extends ViewProps {
    uuid: string;
    name: string;
}

const Header = ({ uuid, name, ...props }: IHeader): React.ReactElement => (
    <View {...props}>
        <Text category="s2">#{uuid}</Text>
        <Text category="h6">{name}</Text>
    </View>
);

const Footer = ({ lastUpdate, ...props }: IFooter): React.ReactElement => (
    <View {...props} style={props.style}>
        <View style={styles.infoWrapper}>
            <Text>Última atualização: </Text>
            <Text style={styles.infoValue}>{lastUpdate}</Text>
        </View>
    </View>
);

export const MachineCard = ({
    so,
    release,
    arch,
    lastUpdate,
    name,
    uuid,
}: IMachineCard): React.ReactElement => {
    return (
        <Layout style={styles.topContainer}>
            <Card
                style={styles.card}
                header={props => <Header {...props} name={name} uuid={uuid} />}
                footer={props => <Footer {...props} lastUpdate={lastUpdate} />}>
                <View style={styles.cardContentWrapper}>
                    <View style={styles.cardContentRight}>
                        <View style={styles.infoWrapper}>
                            <Text>Sistema Operacional: </Text>
                            <Text style={styles.infoValue}>{so}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text>Release: </Text>
                            <Text style={styles.infoValue}>{release}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text>Arquitetura: </Text>
                            <Text style={styles.infoValue}>{arch}</Text>
                        </View>
                    </View>
                    <View style={styles.cardContentLeft}>
                        <Icon style={styles.icon} name="arrow-right" />
                    </View>
                </View>
            </Card>
        </Layout>
    );
};

MachineCard.defaultProps = {
    so: 'Linux',
    release: '5.15.0-73-generic',
    arch: 'x86_64',
    lastUpdate: '03/05/2023 às 16:51',
    uuid: '48848',
    name: 'jhonatancunha',
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
    },
    cardContentWrapper: {
        flexDirection: 'row',
        gap: 20,
    },
    cardContentRight: {
        justifyContent: 'center',
        flex: 1,
    },
    cardContentLeft: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    infoValue: {
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
    },
});
