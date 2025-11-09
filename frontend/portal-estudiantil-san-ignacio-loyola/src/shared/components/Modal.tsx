import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  hideFooter?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Added size prop
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirmar',
  onCancel,
  cancelText = 'Cancelar',
  hideFooter = false,
  size = 'md', // Default size
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = 'unset'; // Restore scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div
        ref={modalRef}
        className={`relative w-full ${modalWidthClass} bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-out scale-100 opacity-100`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h3 id="modal-title" className="text-xl font-semibold text-primary">
            {title}
          </h3>
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-600 transition"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>

        {/* Modal Footer */}
        {!hideFooter && (
          <div className="flex justify-end p-4 border-t border-neutral-200 space-x-2">
            {onCancel && (
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
                onClick={onCancel}
              >
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};