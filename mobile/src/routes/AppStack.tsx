import {
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
import { Bottomvigator } from './BottomTabNavigator';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

export function AppStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="BottomTab" component={Bottomvigator} />
        </Stack.Navigator>
    );
}
