import admin from '../config/firebase.js';

class FirebaseService {

    async send(tokens, message) {

        try {

            const result = await admin.messaging().sendEachForMulticast({tokens: tokens, ...message});

            const invalidTokens = [];

            result.responses.forEach((response, index) => {

                if (!response.success && response.error?.code === 'messaging/registration-token-not-registered') {

                    invalidTokens.push(tokens[index]);

                }

            });

            return { successCount: result.successCount, failureCount: result.failureCount, invalidTokens }
            
        } catch (e) {

            console.error('[FirebaseService]', e);

            throw e;
            
        }
        
    }

}

export default new FirebaseService();
