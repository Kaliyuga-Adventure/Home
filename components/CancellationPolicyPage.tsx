
import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const CancellationPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Cancellation & Refund Policy">
      <p>We understand that sometimes plans change. Our cancellation policy is designed to be as fair as possible. All cancellations must be communicated to us in writing via email to <a href="mailto:kaliyugaadventure@gmail.com">kaliyugaadventure@gmail.com</a>.</p>
      
      <h2>Cancellation Charges</h2>
      <p>The following cancellation charges will apply based on the number of days before your departure date that we receive your cancellation notice:</p>
      <p><strong>More than 60 days before departure:</strong> Loss of deposit.</p>
      <p><strong>Between 60 and 31 days before departure:</strong> 50% of the total booking cost.</p>
      <p><strong>Between 30 and 15 days before departure:</strong> 75% of the total booking cost.</p>
      <p><strong>Less than 15 days before departure:</strong> 100% of the total booking cost (no refund).</p>

      <h2>Unused Services</h2>
      <p><strong>No Refunds:</strong> No refunds or exchanges can be made for any unused portion of the tour, including accommodation, meals, or activities, once the tour has commenced.</p>
      
      <h2>Cancellation by Us</h2>
      <p><strong>Our Responsibility:</strong> In the unlikely event that we have to cancel your trip for any reason other than force majeure, we will offer you the choice of a full refund of all monies paid or an alternative trip of a comparable standard. We are not responsible for any incidental expenses you may have incurred as a result of your booking, such as visas, vaccinations, or non-refundable flights.</p>

      <h2>Travel Insurance</h2>
      <p><strong>Recommendation:</strong> We strongly recommend that you purchase comprehensive travel insurance at the time of booking to protect you against unforeseen circumstances, including trip cancellation, interruption, medical emergencies, and baggage loss.</p>
    </LegalPageLayout>
  );
};
