/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './routes/AppStack';

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}

export default App;
