import { Router } from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middleware/auth';
import { USER_ROLE_ENUM } from '../../utils/constants';
import validate from '../../middleware/validate';
import { PaymentValidation } from './payment.validation';

const router = Router();

router.post(
    '/initiate',
    auth(...USER_ROLE_ENUM),
    validate(PaymentValidation.paymentCreateValidationSchema),
    PaymentController.initiatePayment,
);
router.post('/success/:transactionId', PaymentController.paymentSuccess);
router.post('/fail/:transactionId', PaymentController.paymentFail);
router.post('/cancel/:transactionId', PaymentController.paymentCancel);

export const PaymentRoutes = router;
