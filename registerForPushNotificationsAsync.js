import { Permissions, Notifications, SecureStore } from 'expo';

import request from './src/request';

async function registerForPushNotificationsAsync () {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	
	let finalStatus = existingStatus;

	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		finalStatus = status
	}

	if (finalStatus !== 'granted') {
		return
	}

	let token = await Notifications.getExpoPushTokenAsync()
	return SecureStore.getItemAsync('user')
		.then(user => {
			user = JSON.parse(user)

			return request
				.patch(
					`/api/player/${user.user.id}/`,
					{ push_notification_token: token }
				)
		})
		.catch(err => console.log(err))
}

export default registerForPushNotificationsAsync