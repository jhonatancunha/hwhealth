import {
    StackHeaderProps,
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
import { Header } from '../components/Header';
import { HelpButton } from '../components/HelpButton';
import { MachineConfigurationScreen } from '../screens/MachineConfiguration';
import { MachineInfo } from '../screens/MachineInfo';
import { Bottomvigator } from './BottomTabNavigator';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

export function AppStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="BottomTab" component={Bottomvigator} />
            <Stack.Screen
                name="MachineInfo"
                component={MachineInfo}
                options={{
                    header: (props: StackHeaderProps) => (
                        <Header
                            {...props}
                            title="Detalhes da Máquina"
                            goBackButton
                            configurationButton
                        />
                    ),
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="MachineConfiguration"
                component={MachineConfigurationScreen}
                options={{
                    header: (props: StackHeaderProps) => (
                        <Header
                            {...props}
                            title="Configuração da Máquina"
                            rightButton={<HelpButton />}
                            goBackButton
                        />
                    ),
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}
