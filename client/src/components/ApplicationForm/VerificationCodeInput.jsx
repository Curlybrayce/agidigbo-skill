import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const VerificationCodeInput = ({ onComplete, isSubmitting }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return; // Prevent multi-character input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // If input is filled, move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // If code is complete, call onComplete
    if (index === 5 && value) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
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
      
      // Focus last filled input or first empty input
      const lastIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[lastIndex].focus();

      if (pastedCode.length === 6) {
        onComplete(pastedCode);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h3 className="text-lg font-medium">Enter Verification Code</h3>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>
      </div>

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
            className="w-12 h-12 text-center text-lg font-semibold border rounded-lg
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => onComplete(code.join(''))}
          disabled={code.some(digit => !digit) || isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </span>
          ) : (
            'Verify Code'
          )}
        </button>
      </div>
    </div>
  );
};

export default VerificationCodeInput;