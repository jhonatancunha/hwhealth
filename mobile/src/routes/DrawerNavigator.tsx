import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    DrawerNavigationOptions,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';
import { Bottomvigator } from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
    headerShown: false,
    drawerActiveBackgroundColor: colors.black,
    drawerActiveTintColor: colors.white,
    drawerAllowFontScaling: true,
    swipeEnabled: true,
    drawerType: 'front',
};

function CustomDrawerContent(props) {
    const auth = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={auth?.logout} />
        </DrawerContentScrollView>
    );
}

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
            drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Inicio" component={Bottomvigator} />
        </Drawer.Navigator>
    );
};
