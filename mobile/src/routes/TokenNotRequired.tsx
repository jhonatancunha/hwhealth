import {
    StackNavigationOptions,
    createStackNavigator,
} from '@react-navigation/stack';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

export function TokenNotRequiredStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}
