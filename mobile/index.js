/**
 * @format
 */
import { ONESIGN_APPID } from '@env';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import { name as appName } from './app.json';
import { App } from './src/App';

// OneSignal Initialization
OneSignal.setAppId(ONESIGN_APPID);

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

OneSignal.setInAppMessageClickHandler(event => {
    console.log('OneSignal IAM clicked:', event);
});

OneSignal.addSubscriptionObserver(event => {
    console.log('OneSignal: subscription changed:', event);
});
OneSignal.addPermissionObserver(event => {
    console.log('OneSignal: permission changed:', event);
});

AppRegistry.registerComponent(appName, () => App);
