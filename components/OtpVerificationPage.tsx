
import React, { useState, useRef, useEffect } from 'react';
import { CompanyLogo } from './CompanyLogo';
import type { Page } from '../types';
import { Icon } from './Icon';

interface OtpVerificationPageProps {
  email: string;
  onVerify: (otp: string) => boolean;
  onNavigate: (page: Page) => void;
}

export const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({ email, onVerify, onNavigate }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Automatically focus the first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const timer = resendCooldown > 0 && setInterval(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleResend = () => {
    // In a real app, trigger API to resend OTP
    console.log("Resending OTP...");
    setResendCooldown(30);
    setError('');
    setOtp(new Array(6).fill(''));
    inputsRef.current[0]?.focus();
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Only allow numbers
    
    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1); // Only take the last digit
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }
    
    const success = onVerify(enteredOtp);
    if (!success) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm">
            <div className="mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
                 <CompanyLogo 
                    className="justify-center"
                    iconClassName="h-10 w-10"
                    textClassName="text-3xl font-bold"
                 />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Verify your email
                    </h2>
                     <p className="mt-2 text-sm text-gray-600">
                        We've sent a 6-digit code to <span className="font-semibold text-gray-800 break-all">{email}</span>.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="flex justify-center gap-2" onPaste={handlePaste}>
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          aria-label={`OTP digit ${index + 1}`}
                          name="otp"
                          className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                          maxLength={1}
                          value={data}
                          onChange={e => handleChange(e.target, index)}
                          onKeyDown={e => handleKeyDown(e, index)}
                          onFocus={e => e.target.select()}
                          ref={el => { if(el) inputsRef.current[index] = el; }}
                          autoComplete="one-time-code"
                        />
                      ))}
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    
                    <div>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors">
                            Verify Account
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <p>
                        Didn't receive the code?{' '}
                        {resendCooldown > 0 ? (
                           <span className="text-gray-400">Resend in {resendCooldown}s</span>
                        ) : (
                           <button onClick={handleResend} className="font-medium text-cyan-600 hover:text-cyan-500">
                                Resend
                           </button>
                        )}
                    </p>
                    <button onClick={() => onNavigate('signup')} className="mt-2 font-medium text-gray-600 hover:text-cyan-500">
                        <span className="flex items-center justify-center gap-1">
                          <Icon name="arrowLeft" className="h-4 w-4" /> Back to Sign Up
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
