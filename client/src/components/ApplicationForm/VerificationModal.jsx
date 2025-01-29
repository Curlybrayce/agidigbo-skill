import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowLeft, Info } from 'lucide-react';

const VerificationModal = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  isSubmitting,
  email,
  onResendCode 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back button */}
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to registration
        </button>

        <VerificationCodeInput 
          onComplete={onComplete}
          isSubmitting={isSubmitting}
          email={email}
          onResendCode={onResendCode}
        />
      </div>
    </div>
  );
};

const VerificationCodeInput = ({ onComplete, isSubmitting, email, onResendCode }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (index === 5 && value) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData('text').slice(0, 6);
    
    if (/^\d+$/.test(pastedCode)) {
      const newCode = [...code];
      pastedCode.split('').forEach((char, index) => {
        if (index < 6) newCode[index] = char;
      });
      setCode(newCode);
      
      const lastIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[lastIndex].focus();

      if (pastedCode.length === 6) {
        onComplete(pastedCode);
      }
    }
  };

  const handleResendCode = () => {
    setCode(['', '', '', '', '', ''])
    onResendCode();
    setResendTimer(30);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">
          Verify Your Email
        </h3>
        <p className="text-sm text-gray-500">
          We've sent a verification code to
        </p>
        <p className="text-sm font-medium text-gray-700">
          {email}
        </p>
      </div>

      {/* Info Alert */}
      <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Please check both your inbox and spam folder for the verification code.
        </p>
      </div>

      {/* Code Input */}
      <div className="flex justify-center space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isSubmitting}
            className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg
                     bg-gray-50 focus:bg-white
                     focus:border-blue-600 focus:ring-1 focus:ring-blue-600
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     transition-colors duration-200"
          />
        ))}
      </div>

      {/* Verify Button */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => onComplete(code.join(''))}
          disabled={code.some(digit => !digit) || isSubmitting}
          className="w-full py-3 text-sm font-semibold text-white bg-blue-600 
                   rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 
                   disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </span>
          ) : (
            'Verify Email'
          )}
        </button>

        {/* Resend Code */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendTimer > 0}
            className="text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-400"
          >
            {resendTimer > 0 ? (
              `Resend code in ${resendTimer}s`
            ) : (
              'Resend verification code'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;