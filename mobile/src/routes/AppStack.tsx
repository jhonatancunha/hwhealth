import {
    StackHeaderProps,
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
import { Header } from '../components/Header';
import { HelpButton } from '../components/HelpButton';
import { LoginScreen } from '../screens/Login';
import { MachineConfigurationScreen } from '../screens/MachineConfiguration';
import { MachineInfo } from '../screens/MachineInfo';
import { RegisterScreen } from '../screens/Register';
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
                            rightButton={
                                <HelpButton
                                    title="O que é limiar?"
                                    message="O limiar nesta tela serve para estabelecer o valor mínimo necessário em cada métrica para acionar o sistema de notificação. Ele determina quando uma métrica atinge um estado crítico e dispara uma notificação, permitindo uma resposta rápida e eficaz às situações que exigem atenção imediata. Definir adequadamente os limiares ajuda a evitar alertas desnecessários e garante que apenas métricas relevantes acionem as notificações."
                                />
                            }
                            goBackButton
                        />
                    ),
                    headerShown: true,
                }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}
