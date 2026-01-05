import { Router } from 'express';
import NotificationController from '../controllers/notificationController.js';

const router = Router();

router.post('/send-notification', NotificationController.sendNotification);
router.post('/send-data', NotificationController.sendData);

export default router;
