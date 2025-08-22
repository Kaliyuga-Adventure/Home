import React, { useState } from 'react';
import { Icon } from './Icon';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = '918217712818'; // Company's WhatsApp number
    const whatsappMessage = `Hello Kaliyuga Adventure,\n\nMy name is ${name}.\nMy email is ${email}.\n\nMessage:\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

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
          <h2 className="text-2xl font-bold text-gray-800">Redirecting to WhatsApp...</h2>
          <p className="text-gray-600 mt-2">Your message has been prepared. Please review and send it in WhatsApp.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-cyan-700 transition-colors"
          >
            Send Another Message
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
              <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.888-.001 2.225.651 4.315 1.731 6.086l.06.094-1.105 4.052 4.155-1.088.108.067z"/></svg>
                <span>Send on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};