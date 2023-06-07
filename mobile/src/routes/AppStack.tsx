import {
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
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
            <Stack.Screen name="MachineInfo" component={MachineInfo} />
        </Stack.Navigator>
    );
}
