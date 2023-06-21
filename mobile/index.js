/**
 * @format
 */
import OneSignal from 'react-native-onesignal';

import { ONESIGN_APPID } from '@env';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src/App';

// OneSignal Initialization
OneSignal.setAppId(ONESIGN_APPID);

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
        console.log(
            'OneSignal: notification will show in foreground:',
            notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
    },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
});

AppRegistry.registerComponent(appName, () => App);
