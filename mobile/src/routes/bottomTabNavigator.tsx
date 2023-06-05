import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MachineScreen } from '../screens/Machine';
import { MachineLimiarScreen } from '../screens/MachineLimiar';

interface IPropsIcon {
    color: string;
    size: number;
    focused: boolean;
}

interface IScreens {
    route: string;
    title: string;
    icon: (props: IPropsIcon) => React.ReactElement;
    component: React.FC;
}

const SCREENS: IScreens[] = [
    {
        route: 'Machines',
        title: 'Máquinas',
        icon: ({ color, size }) => {
            return <Entypo name="laptop" color={color} size={size} />;
        },
        component: MachineScreen,
    },
    {
        route: 'Configuration',
        title: 'Configuração',
        icon: ({ color, size }) => {
            return <Ionicons name="settings" color={color} size={size} />;
        },
        component: MachineLimiarScreen,
    },
];

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
    headerShown: true,
    title: 'HWHealth',
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
        paddingVertical: 5,
        backgroundColor: 'white',
        position: 'absolute',
        height: 60,
    },
    tabBarLabelStyle: {
        paddingBottom: 8,
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
                }}
            />
        ))}
    </Tab.Navigator>
);
