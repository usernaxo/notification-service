import FirebaseService from '../services/firebaseService.js';

class NotificationController {

    async send(req, res) {

        try {
            
            const { tokens, message } = req.body;

            if (!tokens || tokens.length === 0) {

                return res.status(422).json({message: 'Tokens required'});

            }

            if (!message || typeof message !== 'object') {

                return res.status(422).json({message: 'Payload required'});

            }

            const response = await FirebaseService.send(tokens, message);

            return res.status(200).json({success: true, result: response});

        } catch (e) {

            console.error('[NotificationController]', e);

            return res.status(500).json({success: false, error: e.message});
            
        }

    }

}

export default new NotificationController();
