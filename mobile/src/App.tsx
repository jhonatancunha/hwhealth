/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './routes/bottomTabNavigator';

function App(): JSX.Element {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </ApplicationProvider>
    );
}

export default App;
