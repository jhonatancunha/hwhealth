/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './routes/bottomTabNavigator';

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}

export default App;
