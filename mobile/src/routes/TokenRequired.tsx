import {
    StackHeaderProps,
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
import { Header } from '../components/Header';
import { HelpIconButton } from '../components/HelpIconButton';
import { MachineConfigurationScreen } from '../screens/MachineConfiguration';
import { MachineInfo } from '../screens/MachineInfo';
import { DrawerNavigator } from './DrawerNavigator';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

export function TokenRequiredStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
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
                                <HelpIconButton
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
        </Stack.Navigator>
    );
}
