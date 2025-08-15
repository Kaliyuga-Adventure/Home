
import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const TermsAndConditionsPage: React.FC = () => {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <h2>1. Introduction</h2>
      <p><strong>Agreement to Terms:</strong> Welcome to Kaliyuga Adventure. These Terms and Conditions govern your use of our website and the services we provide. By accessing our website or booking a trip with us, you agree to be bound by these Terms and Conditions.</p>

      <h2>2. Bookings and Payments</h2>
      <p><strong>Availability & Deposit:</strong> All bookings are subject to availability. A deposit is required to confirm your booking.</p>
      <p><strong>Final Payment:</strong> The final payment is due 60 days before the departure date. We accept various forms of payment, which are detailed in our Payment Policy.</p>

      <h2>3. Cancellations</h2>
      <p><strong>Procedure:</strong> Cancellations must be made in writing. Our Cancellation Policy, which details applicable fees and refunds, is an integral part of these terms.</p>
      <p><strong>Travel Insurance:</strong> We highly recommend purchasing travel insurance.</p>

      <h2>4. Your Responsibilities</h2>
      <p><strong>Travel Documents:</strong> You are responsible for ensuring you have a valid passport, any necessary visas, and have received all required vaccinations.</p>
      <p><strong>Physical Fitness:</strong> It is your responsibility to be aware of the physical demands of the trip you have booked.</p>

      <h2>5. Our Liability</h2>
      <p><strong>Limitation:</strong> Our liability is limited. We are not responsible for any personal injury, death, damage to property, or other loss, whether direct or indirect, arising from your participation in a trip, except where caused by our negligence.</p>
      
      <h2>6. Changes to Itinerary</h2>
      <p><strong>Flexibility:</strong> While we endeavor to operate all trips as described, we reserve the right to change the itinerary due to local circumstances or events out of our control. In such cases, we will provide a suitable alternative.</p>

      <h2>7. Governing Law</h2>
      <p><strong>Jurisdiction:</strong> These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of India.</p>
    </LegalPageLayout>
  );
};
