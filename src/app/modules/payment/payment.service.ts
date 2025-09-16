import { Payment } from './payment.model';
import { TPayment } from './payment.interface';
// @ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';

const store_id = config.store_ID;
const store_passwd = config.store_password;
const is_live = false;
const backend_url = config.backend_url;

export class PaymentService {
   static async initiatePayment(paymentData: TPayment) {
      const transactionId = `txn_${Date.now()}`;

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

      const data = {
         total_amount: paymentData.amount,
         currency: paymentData.currency,
         tran_id: transactionId,

         success_url: `${backend_url}/api/v1/payment/ssl/success/${transactionId}`,
         fail_url: `${backend_url}/api/v1/payment/ssl/fail/${transactionId}`,
         cancel_url: `${backend_url}/api/v1/payment/ssl/cancel/${transactionId}`,

         product_name: 'Product Purchase',
         product_category: 'General',
         product_profile: 'general',

         cus_name: paymentData.customerName,
         cus_email: paymentData.customerEmail,
         cus_add1: 'Dhaka',
         cus_phone: paymentData.customerPhone,

         ship_name: paymentData.customerName,
         ship_add1: 'Dhaka',
         ship_country: 'Bangladesh',

         shipping_method: 'NO',
      };

      await Payment.create({
         ...paymentData,
         transactionId,
         status: 'PENDING',
      });

      return sslcz.init(data);
   }

   static async updatePaymentStatus(
      transactionId: string,
      status: 'SUCCESS' | 'FAILED' | 'CANCELLED',
   ) {
      return Payment.findOneAndUpdate(
         { transactionId },
         { status },
         { new: true },
      );
   }
}
