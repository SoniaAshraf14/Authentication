import React from 'react';

const PasswordCheck = ({ label, isValid }) => {
  return (
    <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
      <span>{isValid ? '✅' : '❌'}</span>
      <span>{label}</span>
    </div>
  );
};

export default PasswordCheck;
