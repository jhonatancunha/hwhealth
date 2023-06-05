/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Bottomvigator } from './routes/bottomTabNavigator';

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Bottomvigator />
        </NavigationContainer>
    );
}

export default App;
