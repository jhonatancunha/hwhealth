import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import React from 'react';
import { MachineScreen } from '../screens/Machine';
import { MachineLimiarScreen } from '../screens/MachineLimiar';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title="Máquinas" />
        <BottomNavigationTab title="Configurações" />
    </BottomNavigation>
);

export const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="Machines" component={MachineScreen} />
        <Screen name="MachineLimiar" component={MachineLimiarScreen} />
    </Navigator>
);
