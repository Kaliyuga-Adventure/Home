import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const PaymentPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Payment Policy">
      <h2>1. Booking Confirmation</h2>
      <p><strong>Deposit Requirement:</strong> To confirm your travel package with Kaliyuga Adventure, a deposit is required. The deposit amount will be specified at the time of booking and is typically 25% of the total package cost.</p>
      <p><strong>Confirmation:</strong> Your booking is not confirmed until the deposit is received and you have received a confirmation email from us.</p>
      
      <h2>2. Final Payment</h2>
      <p><strong>Due Date:</strong> The final balance of your payment is due 60 days prior to your departure date. We will send you a reminder email before the due date.</p>
      <p><strong>Non-Payment:</strong> If the final payment is not received by the due date, we reserve the right to treat your booking as cancelled and apply the cancellation charges as set out in our Cancellation Policy.</p>
      
      <h2>3. Methods of Payment</h2>
      <p>We accept the following methods of payment:</p>
      <ul>
        <li><strong>Bank Transfer:</strong> Details will be provided upon booking.</li>
        <li><strong>Cards:</strong> Credit/Debit Cards (Visa, MasterCard) via a secure online payment gateway.</li>
        <li><strong>UPI:</strong> We accept UPI Payments.</li>
      </ul>
      <p><strong>Additional Fees:</strong> Please note that any bank charges or credit card processing fees are to be borne by the customer.</p>

      <h2>4. Pricing</h2>
      <p><strong>Currency:</strong> All prices are quoted in Indian Rupees (INR) unless otherwise stated.</p>
      <p><strong>Price Validity:</strong> Prices are subject to change without prior notice, but will not affect confirmed bookings for which a deposit has been paid.</p>

      <h2>5. Late Bookings</h2>
      <p><strong>Full Payment:</strong> For bookings made within 60 days of departure, the full amount of the tour cost is required at the time of booking.</p>
    </LegalPageLayout>
  );
};