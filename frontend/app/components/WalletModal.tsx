'use client';

import { FC, MouseEventHandler } from 'react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default WalletModal;