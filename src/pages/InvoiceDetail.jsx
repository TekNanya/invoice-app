import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/format';
import DeleteModal from '../components/DeleteModal';
import InvoiceForm from '../components/Form/InvoiceForm';
import { AnimatePresence } from 'framer-motion';

const InvoiceDetail = ({ invoices, onDelete, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen font-spartan">
        <h1 className="text-2xl font-bold dark:text-white">Invoice not found</h1>
        <Link to="/" className="mt-4 text-[#7C5DFA] font-bold underline">Return Home</Link>
      </div>
    );
  }


  const isPaid = invoice.status === 'paid';

  const handleMarkAsPaid = () => {
    if (!isPaid) {
      onUpdate({ ...invoice, status: 'paid' });
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(invoice.id);
    setIsDeleteModalOpen(false);
    navigate('/');
  };

  const handleEditSubmit = (updatedInvoice) => {
    // Final safety: don't allow updates if the original was paid
    if (isPaid) return;
    onUpdate(updatedInvoice);
    setIsFormOpen(false);
  };

  return (
    <>
      <main className="max-w-[730px] mx-auto px-6 py-8 md:py-12 lg:py-16 font-spartan pb-32 md:pb-12 transition-all">
        {/* Back Button */}
        <Link to="/" className="flex items-center gap-6 mb-8 group w-fit">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
          </svg>
          <span className="text-[12px] font-bold dark:text-white group-hover:text-[#7E88C3] transition-colors pt-1">
            Go back
          </span>
        </Link>

        {/* Action Header */}
        <div className="bg-white dark:bg-[#1E2139] p-6 md:px-8 rounded-lg shadow-sm flex items-center justify-between mb-6">
          <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
            <span className="text-[#858BB2] dark:text-[#DFE3FA] text-[12px]">Status</span>
            <StatusBadge status={invoice.status} />
          </div>
          
          <div className="hidden md:flex gap-2">
          
            {!isPaid && (
              <button 
                onClick={() => setIsFormOpen(true)} 
                className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] px-6 py-4 rounded-full font-bold text-[12px] transition-colors"
              >
                Edit
              </button>
            )}
            
            <button 
              onClick={() => setIsDeleteModalOpen(true)} 
              className="bg-[#EC5757] hover:bg-[#FF9797] text-white px-6 py-4 rounded-full font-bold text-[12px] transition-colors"
            >
              Delete
            </button>

         
            {!isPaid && (
              <button 
                onClick={handleMarkAsPaid} 
                className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-6 py-4 rounded-full font-bold text-[12px] transition-colors"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        {/* Invoice Card Content */}
        <div className="bg-white dark:bg-[#1E2139] p-6 md:p-12 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div>
              <h1 className="text-[16px] font-bold dark:text-white mb-2 uppercase tracking-tight">
                <span className="text-[#888EB0]">#</span>{invoice.id}
              </h1>
              <p className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] font-medium">{invoice.description}</p>
            </div>
            <div className="text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] md:text-right leading-[18px] font-medium tracking-tight">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3 font-medium">Invoice Date</h3>
                <p className="text-[15px] font-bold dark:text-white">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3 font-medium">Payment Due</h3>
                <p className="text-[15px] font-bold dark:text-white">{formatDate(invoice.paymentDue)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3 font-medium">Bill To</h3>
              <p className="text-[15px] font-bold dark:text-white mb-2">{invoice.clientName}</p>
              <div className="text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] leading-[18px] font-medium">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3 font-medium">Sent to</h3>
              <p className="text-[15px] font-bold dark:text-white break-all">{invoice.clientEmail}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-t-lg p-6 md:p-8 mt-10">
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] mb-8 font-medium">
              <span>Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-6 md:space-y-8">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold dark:text-white">{item.name}</span>
                    <span className="md:hidden text-[12px] font-bold text-[#7E88C3]">
                      {item.quantity} x £ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="hidden md:block text-center text-[12px] font-bold text-[#7E88C3] dark:text-[#DFE3FA]">{item.quantity}</span>
                  <span className="hidden md:block text-right text-[12px] font-bold text-[#7E88C3] dark:text-[#DFE3FA]">£ {item.price.toFixed(2)}</span>
                  <span className="text-right text-[12px] font-bold dark:text-white">£ {item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#373B53] dark:bg-[#0C0E1B] p-6 md:px-8 flex justify-between items-center rounded-b-lg text-white">
            <span className="text-[11px] font-medium">Amount Due</span>
            <span className="text-[20px] md:text-[24px] font-bold">£ {invoice.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#1E2139] p-6 flex justify-end items-center gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
          {!isPaid && (
            <button 
              onClick={() => setIsFormOpen(true)} 
              className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[12px] flex-1 transition-colors"
            >
              Edit
            </button>
          )}
          <button 
            onClick={() => setIsDeleteModalOpen(true)} 
            className="bg-[#EC5757] text-white px-6 py-4 rounded-full font-bold text-[12px] flex-1 hover:bg-[#FF9797] transition-colors"
          >
            Delete
          </button>
          {!isPaid && (
            <button 
              onClick={handleMarkAsPaid} 
              className="bg-[#7C5DFA] text-white px-6 py-4 rounded-full font-bold text-[12px] flex-1 hover:bg-[#9277FF] transition-colors"
            >
              Mark Paid
            </button>
          )}
        </div>
      </main>

      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onCancel={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDeleteConfirm} 
        id={invoice.id}
      />

      <AnimatePresence>
        {isFormOpen && !isPaid && (
          <InvoiceForm 
            invoiceData={invoice} 
            onClose={() => setIsFormOpen(false)} 
            onSubmit={handleEditSubmit} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default InvoiceDetail;
