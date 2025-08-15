import React, { useState } from 'react';
import { Icon } from './Icon';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = 'kaliyugaadventure@gmail.com';
    const subject = `New Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    // Open user's default email client
    window.location.href = mailtoLink;

    setSubmitted(true);
    // Reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="bg-white max-w-lg mx-auto p-12 rounded-xl shadow-lg">
          <Icon name="checkCircle" className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
          <p className="text-gray-600 mt-2">Your email client should have opened. Please review and send the message from there.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-cyan-700 transition-colors"
          >
            Create Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
          <div className="w-full md:w-2/5 bg-cyan-600 p-8 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="mt-2 text-cyan-100">Have questions? We'd love to hear from you.</p>
             <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="phone" className="h-5 w-5 flex-shrink-0" />
                  <span>+91 82177 12818</span>
                </div>
                 <div className="flex items-start space-x-3">
                  <Icon name="mail" className="h-5 w-5 flex-shrink-0 mt-1" />
                  <span className="break-words">kaliyugaadventure@gmail.com</span>
                </div>
              </div>
          </div>
          <div className="w-full md:w-3/5 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" id="name" placeholder="Your Name" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" placeholder="Your Email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" placeholder="Your Message" rows={5} required value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};