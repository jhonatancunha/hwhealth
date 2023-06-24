import {
    BottomTabHeaderProps,
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../components/Header';
import { DeleteNotificationIconButton } from '../components/IconButton/DeleteNotification';
import { OpenDrawerIconButton } from '../components/IconButton/OpenDrawer';
import { MachineScreen } from '../screens/Machines';
import { NotificationScreen } from '../screens/Notifications';
import { colors } from '../theme/colors';

interface IPropsIcon {
    color: string;
    size: number;
    focused: boolean;
}

type TabBottomParamList = {
    Notification: {
        getNotifications: () => void,
    },
    Machines: undefined,
};

// eslint-disable-next-line prettier/prettier
type TabBottomParamListKeys = keyof TabBottomParamList;


interface IScreens {
    route: TabBottomParamListKeys;
    title: string;
    component: React.FC;
    icon: (props: IPropsIcon) => React.ReactElement;
    header: (props: BottomTabHeaderProps) => React.ReactElement;
}

const Tab = createBottomTabNavigator<TabBottomParamList>();

const SCREENS: IScreens[] = [
    {
        route: 'Machines',
        title: 'Máquinas',
        component: MachineScreen,
        icon: ({ size }) => {
            return <Entypo name="laptop" color="white" size={size} />;
        },
        header: (props: BottomTabHeaderProps) => (
            <Header {...props} title="Minhas Máquinas" 
                leftButton={<OpenDrawerIconButton />} 
            />
        ),
    },
    {
        route: 'Notification',
        title: 'Notificações',
        component: NotificationScreen,
        icon: ({ size }) => {
            return (
                <Ionicons
                    name="notifications"
                    color={colors.white}
                    size={size}
                />
            );
        },
        header: (props: BottomTabHeaderProps) => (
            <Header
                {...props}
                title="Histórico de Notificações"
                rightButton={
                    <DeleteNotificationIconButton
                        title="Deseja apagar todas as noticações?"
                        message='Antes de excluir permanentemente suas notificações, revise com cuidado o conteúdo. 
                        Essa ação não pode ser desfeita, e todas as notificações serão removidas definitivamente. 
                        Perderá acesso a todas as informações e mensagens associadas. 
                        Clique em "Confirmar" para excluir ou em "Cancelar" para interromper a ação.'
                    />
                }
            />
        ),
    },
];

const screenOptions: BottomTabNavigationOptions = {
    headerShown: true,
    title: 'HWHealth',
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
        paddingVertical: 5,
        backgroundColor: colors.black,
        position: 'absolute',
        height: 60,
    },
    tabBarLabelStyle: {
        paddingBottom: 8,
        fontFamily: 'Inter-Medium',
    },
};

export const Bottomvigator = () => (
    <Tab.Navigator screenOptions={screenOptions}>
        {SCREENS.map((screen: IScreens) => (
            <Tab.Screen
                key={screen.route}
                name={screen.route}
                component={screen.component}
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                options={{
                    tabBarLabel: screen.title,
                    tabBarIcon: screen.icon,
                    header: screen.header,
                }}
            />
        ))}
    </Tab.Navigator>
);
