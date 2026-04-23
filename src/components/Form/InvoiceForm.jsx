import { motion } from 'framer-motion';
import DatePicker from "react-datepicker";
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import FormItem from './FormItem';

// Required for the date picker functionality
import "react-datepicker/dist/react-datepicker.css";

const defaultValues = {
  description: '',
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',
  senderAddress: { street: '', city: '', postCode: '', country: '' },
  clientAddress: { street: '', city: '', postCode: '', country: '' },
  items: [],
  createdAt: new Date().toISOString().split('T')[0],
};

const InvoiceForm = ({ onClose, onSubmit, invoiceData }) => {
  const isEditing = !!invoiceData;

  const { 
    formData, 
    errors, 
    updateField, 
    updateItem, 
    addItem, 
    removeItem, 
    handleAction 
  } = useInvoiceForm(invoiceData || defaultValues, onSubmit, onClose);

  const getFieldStyles = (errorKey) => {
    const baseInput = "input-style transition-colors duration-200";
    const baseLabel = "label-style flex justify-between items-center";
    return {
      input: `${baseInput} ${errors[errorKey] ? 'border-[#EC5757] dark:border-[#EC5757]' : ''}`,
      label: `${baseLabel} ${errors[errorKey] ? 'text-[#EC5757]' : ''}`
    };
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 z-30"
      />

      {/* Form Container */}
      <motion.div 
        initial={{ x: '-100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="fixed top-0 left-0 lg:left-[103px] w-full md:w-[616px] lg:w-[719px] h-screen bg-white dark:bg-[#141625] z-40 flex flex-col md:rounded-r-[20px] shadow-2xl"
      >
        <div className="flex-1 overflow-y-auto pt-8 px-6 md:pt-14 md:px-14 pb-8 custom-scrollbar">
          {/* Mobile Navigation */}
          <button onClick={onClose} className="flex items-center gap-6 mb-8 md:hidden group">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
            <span className="text-[12px] font-bold dark:text-white pt-1">Go back</span>
          </button>

          <h1 className="text-[24px] font-bold dark:text-white mb-12 tracking-[-0.5px]">
            {isEditing ? <>Edit <span className="text-[#888EB0]">#</span>{invoiceData.id}</> : 'New Invoice'}
          </h1>

          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            {/* BILL FROM SECTION */}
            <section className="space-y-6">
              <p className="text-[#7C5DFA] font-bold text-[12px] tracking-[-0.25px]">Bill From</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-full">
                  <label className={getFieldStyles('senderStreet').label}>Street Address</label>
                  <input 
                    type="text" 
                    className={getFieldStyles('senderStreet').input} 
                    value={formData.senderAddress.street} 
                    onChange={(e) => updateField('senderAddress.street', e.target.value)} 
                  />
                </div>
                <div className="col-span-1">
                  <label className={getFieldStyles('senderCity').label}>City</label>
                  <input type="text" className={getFieldStyles('senderCity').input} value={formData.senderAddress.city} onChange={(e) => updateField('senderAddress.city', e.target.value)} />
                </div>
                <div className="col-span-1">
                  <label className={getFieldStyles('senderPostCode').label}>Post Code</label>
                  <input type="text" className={getFieldStyles('senderPostCode').input} value={formData.senderAddress.postCode} onChange={(e) => updateField('senderAddress.postCode', e.target.value)} />
                </div>
                <div className="col-span-full md:col-span-1">
                  <label className={getFieldStyles('senderCountry').label}>Country</label>
                  <input type="text" className={getFieldStyles('senderCountry').input} value={formData.senderAddress.country} onChange={(e) => updateField('senderAddress.country', e.target.value)} />
                </div>
              </div>
            </section>

            {/* BILL TO SECTION */}
            <section className="space-y-6">
              <p className="text-[#7C5DFA] font-bold text-[12px]">Bill To</p>
              <div className="space-y-6">
                <div>
                  <label className={getFieldStyles('clientName').label}>
                    Client's Name {errors.clientName && <span className="text-[10px]">{errors.clientName}</span>}
                  </label>
                  <input type="text" className={getFieldStyles('clientName').input} value={formData.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
                </div>
                <div>
                  <label className={getFieldStyles('clientEmail').label}>
                    Client's Email {errors.clientEmail && <span className="text-[10px]">{errors.clientEmail}</span>}
                  </label>
                  <input type="email" placeholder="e.g. email@example.com" className={getFieldStyles('clientEmail').input} value={formData.clientEmail} onChange={(e) => updateField('clientEmail', e.target.value)} />
                </div>
                <div className="col-span-full">
                  <label className={getFieldStyles('clientStreet').label}>Street Address</label>
                  <input type="text" className={getFieldStyles('clientStreet').input} value={formData.clientAddress.street} onChange={(e) => updateField('clientAddress.street', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label className={getFieldStyles('clientCity').label}>City</label>
                    <input type="text" className={getFieldStyles('clientCity').input} value={formData.clientAddress.city} onChange={(e) => updateField('clientAddress.city', e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    <label className={getFieldStyles('clientPostCode').label}>Post Code</label>
                    <input type="text" className={getFieldStyles('clientPostCode').input} value={formData.clientAddress.postCode} onChange={(e) => updateField('clientAddress.postCode', e.target.value)} />
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label className={getFieldStyles('clientCountry').label}>Country</label>
                    <input type="text" className={getFieldStyles('clientCountry').input} value={formData.clientAddress.country} onChange={(e) => updateField('clientAddress.country', e.target.value)} />
                  </div>
                </div>
              </div>
            </section>

            {/* DATES & TERMS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-style">Invoice Date</label>
                <div className="w-full relative">
                  <DatePicker
                    selected={new Date(formData.createdAt)}
                    onChange={(date) => updateField('createdAt', date.toISOString().split('T')[0])}
                    disabled={isEditing}
                    dateFormat="dd MMM yyyy"
                    customInput={
                      <button 
                        type="button"
                        className={`${getFieldStyles('createdAt').input} w-full flex items-center justify-between text-left px-5`}
                      >
                        <span className="font-bold flex-1">
                          {new Date(formData.createdAt).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#7E88C3] flex-shrink-0 ml-4">
                          <path d="M14 2h-.667V.667A.667.667 0 0012.667 0a.667.667 0 00-.667.667V2H4V.667A.667.667 0 003.333 0a.666.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2c-.367 0-.667-.3-.667-.667V7h13.334v7z" fillRule="nonzero"/>
                        </svg>
                      </button>
                    }
                    calendarClassName="invoice-calendar"
                    showPopperArrow={false}
                  />
                </div>
              </div>
              
              <div>
                <label className="label-style">Payment Terms</label>
                <div className="relative group">
                  <select 
                    className="input-style cursor-pointer appearance-none pr-12 relative z-10 bg-transparent focus:border-[#7C5DFA] outline-none font-bold"
                    value={formData.paymentTerms} 
                    onChange={(e) => updateField('paymentTerms', Number(e.target.value))}
                  >
                    <option value={1} className="dark:bg-[#1E2139]">Net 1 Day</option>
                    <option value={7} className="dark:bg-[#1E2139]">Net 7 Days</option>
                    <option value={14} className="dark:bg-[#1E2139]">Net 14 Days</option>
                    <option value={30} className="dark:bg-[#1E2139]">Net 30 Days</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label className={getFieldStyles('description').label}>Project Description</label>
                <input type="text" placeholder="e.g. Graphic Design Service" className={getFieldStyles('description').input} value={formData.description} onChange={(e) => updateField('description', e.target.value)} />
              </div>
            </div>

            {/* ITEM LIST SECTION */}
            <section>
              <h3 className="text-[18px] text-[#777F98] font-bold mb-6 tracking-tight">Item List</h3>
              <div className="hidden md:grid grid-cols-[2.5fr_0.6fr_1fr_0.8fr_auto] gap-4 mb-4 px-2">
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-[12px]">Item Name</span>
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-[12px]">Qty.</span>
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-[12px]">Price</span>
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-[12px]">Total</span>
                <div className="w-4"></div>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <FormItem key={index} index={index} item={item} onUpdate={updateItem} onDelete={removeItem} errors={errors} />
                ))}
              </div>
              
              {errors.items && <p className="text-[#EC5757] text-[10px] font-bold mt-8">{errors.items}</p>}
              
              <button type="button" onClick={addItem} className="w-full mt-4 bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] py-4 rounded-full font-bold text-[12px] transition-colors">
                + Add New Item
              </button>
            </section>
          </form>
        </div>

        {/* FOOTER ACTIONS */}
        <footer className="bg-white dark:bg-[#1E2139] md:dark:bg-[#141625] px-6 py-8 md:px-14 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:rounded-br-[20px] mt-auto">
          <button type="button" onClick={onClose} className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[12px] hover:bg-[#DFE3FA] transition-colors">
            {isEditing ? 'Cancel' : 'Discard'}
          </button>
          
          <div className="flex gap-2">
            {!isEditing && (
              <button type="button" onClick={() => handleAction('draft')} className="bg-[#373B53] text-[#888EB0] hover:bg-[#0C0E1B] px-4 md:px-6 py-4 rounded-full font-bold text-[12px] transition-colors">
                Save as Draft
              </button>
            )}
            <button type="button" onClick={() => handleAction('pending')} className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-4 md:px-6 py-4 rounded-full font-bold text-[12px] transition-colors">
              {isEditing ? 'Save Changes' : 'Save & Send'}
            </button>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default InvoiceForm;
