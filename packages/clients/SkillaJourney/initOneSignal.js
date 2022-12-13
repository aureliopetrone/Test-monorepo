import OneSignal, {LogLevel} from 'react-native-onesignal';

export const initOneSignal = () => {

  OneSignal.setLogLevel(0, 0);
  OneSignal.setAppId("b6340b77-fb35-46e5-9402-2f811a3f574f");

  OneSignal.promptForPushNotificationsWithUserResponse(response => { });

  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    let notification = notificationReceivedEvent.getNotification();
    const data = notification.additionalData;
    notificationReceivedEvent.complete(notification);
  });

  OneSignal.setNotificationOpenedHandler(notification => { });

};
