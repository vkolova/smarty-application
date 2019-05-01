import { Permissions, Notifications, SecureStore } from 'expo';

import request from './src/request'
import { SERVER_URL } from './config';

const PUSH_ENDPOINT = `${SERVER_URL}/users/push-token`;

async function registerForPushNotificationsAsync () {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()

  // POST the token to the backend server from where you can retrieve it to send push notifications.
  return SecureStore.getItemAsync('user')
    .then(user => {
      user = JSON.parse(user)

      return request
        .patch(
          `/api/player/${user.id}/`,
          { push_notification_token: token }
        )
    })
    .catch(err => console.log(err))
}

export default registerForPushNotificationsAsync