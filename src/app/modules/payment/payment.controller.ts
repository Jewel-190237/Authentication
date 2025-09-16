import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios'; 
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';
import config from '../../config';

const frontend_url = config.frontend_url;
export class PaymentController {
    static initiatePayment = catchAsync(async (req: Request, res: Response) => {
        const { body } = req.body;
        const payment = await PaymentService.initiatePayment(body);

        sendResponse(res, {
            statusCode: HttpStatusCode.Created,
            success: true,
            message: 'Redirect to SSLCommerz for payment',
            data: payment?.GatewayPageURL,
        });
    });

    static paymentSuccess = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        await PaymentService.updatePaymentStatus(transactionId, 'SUCCESS');

        res.redirect(`${frontend_url}/payment-success?txnId=${transactionId}`);
    });

    static paymentFail = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        await PaymentService.updatePaymentStatus(transactionId, 'FAILED');

        res.redirect(`${frontend_url}/payment-fail?txnId=${transactionId}`);
    });

    static paymentCancel = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        await PaymentService.updatePaymentStatus(transactionId, 'CANCELLED');

        res.redirect(`${frontend_url}/payment-cancel?txnId=${transactionId}`);
    });
}
