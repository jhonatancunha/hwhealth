import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
    BottomNavigation,
    BottomNavigationTab,
    IconElement,
    Text,
} from '@ui-kitten/components';
import React from 'react';
import { Icon } from 'react-native-eva-icons';
import { MachineScreen } from '../screens/Machine';
import { MachineLimiarScreen } from '../screens/MachineLimiar';

const { Navigator, Screen } = createBottomTabNavigator();

interface IScreens {
    route: string;
    title: string;
    icon: IconElement;
    component: React.FC;
}

const SCREENS: IScreens[] = [
    {
        route: 'Machines',
        title: 'Máquinas',
        icon: <Icon name="hard-drive" />,
        component: MachineScreen,
    },
    {
        route: 'Configuration',
        title: 'Configuração',
        icon: <Icon name="settings" />,
        component: MachineLimiarScreen,
    },
];

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        {SCREENS.map((screen: IScreens) => (
            <BottomNavigationTab
                key={screen.title}
                title={evaProps => <Text {...evaProps}>{screen.title}</Text>}
                icon={screen.icon}
            />
        ))}
    </BottomNavigation>
);

export const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        {SCREENS.map((screen: IScreens) => (
            <Screen
                key={screen.route}
                name={screen.route}
                component={screen.component}
            />
        ))}
    </Navigator>
);
