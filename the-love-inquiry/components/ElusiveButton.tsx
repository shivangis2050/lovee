import React, { useState, useCallback } from 'react';

interface ElusiveButtonProps {
  onAttempt: () => void;
}

const ElusiveButton: React.FC<ElusiveButtonProps> = ({ onAttempt }) => {
  // Movement is removed to satisfy "no floating away"
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onAttempt();
      }}
      className="px-8 py-3 font-semibold text-slate-500 bg-white border-2 border-slate-200 rounded-full transition-all duration-200 ease-out shadow-sm hover:shadow-md select-none active:scale-90"
    >
      No
    </button>
  );
};

export default ElusiveButton;