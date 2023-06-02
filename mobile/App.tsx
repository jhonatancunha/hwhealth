/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    View,
} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import {
    Colors,
    Header,
    LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = useMemo(
        () => ({
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        }),
        [isDarkMode],
    );

    const viewStyle = useMemo(
        () => ({
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }),
        [isDarkMode],
    );

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <Header />
                    <View style={viewStyle}>
                        <LearnMoreLinks />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ApplicationProvider>
    );
}

export default App;
