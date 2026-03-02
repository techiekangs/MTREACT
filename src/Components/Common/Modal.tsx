import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'success' | 'error' | 'default';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content,
  size = 'md',
  variant = 'default'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const variantClasses = {
    success: {
      header: 'bg-green-50 border-green-200',
      title: 'text-green-900',
      closeBtn: 'text-green-400 hover:text-green-600'
    },
    error: {
      header: 'bg-red-50 border-red-200',
      title: 'text-red-900',
      closeBtn: 'text-red-400 hover:text-red-600'
    },
    default: {
      header: 'bg-white border-gray-200',
      title: 'text-gray-900',
      closeBtn: 'text-gray-400 hover:text-gray-600'
    }
  };
  
  const colors = variantClasses[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 transition-opacity" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${colors.header}`}>
          <h2 className={`text-xl font-semibold ${colors.title}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`${colors.closeBtn} transition-colors`}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
