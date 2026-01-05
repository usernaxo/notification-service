import admin from '../config/firebase.js';

class FirebaseService {

    async sendMulticastNotification({tokens, notification, android, apns}) {

        const message = {tokens, notification, android, apns};

        return this._send(message);

    }

    async sendMulticastData({tokens, data, android, apns}) {

        const message = {tokens, data, android, apns};

        return this._send(message);

    }

    async _send(message) {

        try {

            const response = await admin.messaging().sendEachForMulticast(message);

            return response;
            
        } catch (e) {

            console.error('[FirebaseService]', e);

            throw e;
            
        }
        
    }

}

export default new FirebaseService();
