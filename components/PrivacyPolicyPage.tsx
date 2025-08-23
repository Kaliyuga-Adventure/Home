import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>Your privacy is important to us. It is Kaliyuga Adventure's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
      
      <h2>1. Information We Collect</h2>
      <p><strong>Service Provision:</strong> We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
      
      <h3>Types of Data Collected</h3>
      <p><strong>Log Data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser. This may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
      <p><strong>Personal Information:</strong> We may ask for personal information, such as your Name, Email, and Phone/mobile number, to facilitate our travel services.</p>

      <h2>2. Legal Bases for Processing</h2>
      <p><strong>Lawful Basis:</strong> We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.</p>

      <h2>3. Use of Information</h2>
      <p>We may use the information we collect for various purposes, including to:</p>
      <ul>
        <li><strong>Service Delivery:</strong> Provide, operate, and maintain our website and services.</li>
        <li><strong>Improvement:</strong> Improve, personalize, and expand our website and offerings.</li>
        <li><strong>Analytics:</strong> Understand and analyze how you use our website.</li>
        <li><strong>Development:</strong> Develop new products, services, features, and functionality.</li>
        <li><strong>Communication:</strong> Communicate with you for customer service, updates, and marketing purposes.</li>
        <li><strong>Fraud Prevention:</strong> Find and prevent fraud.</li>
      </ul>
      

      <h2>4. Security of Your Personal Information</h2>
      <p><strong>Our Commitment:</strong> The security of your personal information is important to us. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security as no method of transmission over the Internet, or method of electronic storage, is 100% secure.</p>

      <h2>5. Changes to This Privacy Policy</h2>
      <p><strong>Updates:</strong> We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

      <h2>Contact Us</h2>
      <p><strong>Questions:</strong> If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:kaliyugaadventure@gmail.com">kaliyugaadventure@gmail.com</a>.</p>
    </LegalPageLayout>
  );
};