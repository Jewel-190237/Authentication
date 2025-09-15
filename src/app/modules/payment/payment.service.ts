import { Payment } from './payment.model';
import { TPayment } from './payment.interface';
// @ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts';

const store_id = process.env.SSLC_STORE_ID as string;
const store_passwd = process.env.SSLC_STORE_PASSWORD as string;
const is_live = false; // true for live, false for sandbox

export class PaymentService {
  static async initiatePayment(paymentData: TPayment) {
    const transactionId = `txn_${Date.now()}`;

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const data = {
      total_amount: paymentData.amount,
      currency: paymentData.currency,
      tran_id: transactionId,
      success_url: `${process.env.BACKEND_URL}/api/payment/success/${transactionId}`,
      fail_url: `${process.env.BACKEND_URL}/api/payment/fail/${transactionId}`,
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel/${transactionId}`,
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
    };

    // Save pending payment
    await Payment.create({
      ...paymentData,
      transactionId,
      status: 'PENDING',
    });

    return sslcz.init(data);
  }

  static async updatePaymentStatus(transactionId: string, status: 'SUCCESS' | 'FAILED' | 'CANCELLED') {
    return Payment.findOneAndUpdate(
      { transactionId },
      { status },
      { new: true }
    );
  }
}
