import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteModal = ({ id, onDelete, onCancel, isOpen }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop with smooth fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-[480px] rounded-lg bg-white p-8 dark:bg-[#1E2139] md:p-12 shadow-2xl"
            role="alertdialog"
          >
            <h2 className="mb-3 text-[24px] font-bold leading-8 tracking-[-0.5px] dark:text-white">
              Confirm Deletion
            </h2>
            
            <p className="mb-4 text-[12px] font-medium leading-[22px] tracking-[-0.25px] text-[#888EB0] dark:text-[#DFE3FA]">
              Are you sure you want to delete invoice <span className="font-bold text-[#0C0E16] dark:text-white">#{id}</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-2 mt-4">
              <button 
                type="button"
                onClick={onCancel}
                className="rounded-full bg-[#F9FAFE] px-6 py-4 text-[12px] font-bold text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={onDelete}
                className="rounded-full bg-[#EC5757] px-6 py-4 text-[12px] font-bold text-white hover:bg-[#FF9797] transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;