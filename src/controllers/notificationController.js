import FirebaseService from '../services/firebaseService.js';

class NotificationController {

    async sendNotification(req, res) {

        try {
            
            const { tokens, notification, android, apns } = req.body;

            if (!Array.isArray(tokens) || tokens.length === 0) {

                return res.status(422).json({message: 'Tokens required'});

            }

            if (!notification || !notification.title || !notification.body) {

                return res.status(422).json({message: 'Invalid notification format'});

            }

            const response = await FirebaseService.sendMulticastNotification({tokens, notification, android, apns});

            return res.status(200).json({message: 'Notification sent', result: response});

        } catch (e) {

            console.error('[sendNotification]', error);

            return res.status(500).json({message: 'Send notification failed', error: e.message});
            
        }

    }

    async sendData(req, res) {

        try {
            
            const { tokens, data, android, apns } = req.body;

            if (!Array.isArray(tokens) || tokens.length === 0) {

                return res.status(422).json({message: 'Tokens required'});

            }

            if (!data || typeof data !== 'object') {

                return res.status(422).json({message: 'Invalid data format'});

            }

            const response = await FirebaseService.sendMulticastData({tokens, data, android, apns});

            return res.status(200).json({message: 'Data sent', result: response});

        } catch (e) {

            console.error('[sendData]', error);

            return res.status(500).json({message: 'Send data failed', error: e.message});
            
        }

    }

}

export default new NotificationController();
