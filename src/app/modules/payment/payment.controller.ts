import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

export class PaymentController {
    static initiatePayment = catchAsync(async (req: Request, res: Response) => {
        const payment = await PaymentService.initiatePayment(req.body);
        sendResponse(res, {
            statusCode: HttpStatusCode.Created,
            success: true,
            message: 'Redirect to SSLCommerz for payment',
            data: payment,
        });
    });

    static paymentSuccess = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        const updatedPayment = await PaymentService.updatePaymentStatus(
            transactionId,
            'SUCCESS',
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/payment-success?txnId=${transactionId}`,
        );
    });

    static paymentFail = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        await PaymentService.updatePaymentStatus(transactionId, 'FAILED');

        res.redirect(
            `${process.env.FRONTEND_URL}/payment-fail?txnId=${transactionId}`,
        );
    });

    static paymentCancel = catchAsync(async (req: Request, res: Response) => {
        const { transactionId } = req.params;
        await PaymentService.updatePaymentStatus(transactionId, 'CANCELLED');

        res.redirect(
            `${process.env.FRONTEND_URL}/payment-cancel?txnId=${transactionId}`,
        );
    });
}
