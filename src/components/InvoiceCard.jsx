import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/format';

const InvoiceCard = ({ invoice }) => {
  return (
    <Link to={`/invoice/${invoice.id}`}>
      <div className="bg-white dark:bg-[#1E2139] p-6 md:px-8 md:py-4 rounded-lg shadow-sm border border-transparent hover:border-[#7C5DFA] transition-all cursor-pointer group font-spartan">
        
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_auto] items-center gap-4">
          <span className="text-[12px] font-bold dark:text-white uppercase">
            <span className="text-[#7E88C3]">#</span>{invoice.id}
          </span>
          
          <span className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA]">
            Due {formatDate(invoice.paymentDue)}
          </span>
          
          <span className="text-[12px] text-[#858BB2] dark:text-white">
            {invoice.clientName}
          </span>

          <span className="text-[16px] font-bold dark:text-white text-right pr-4">
            £ {invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>

          <div className="flex justify-center">
            <StatusBadge status={invoice.status} />
          </div>

          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Mobile Layout*/}
        <div className="md:hidden grid grid-cols-2 gap-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold dark:text-white uppercase">
              <span className="text-[#7E88C3]">#</span>{invoice.id}
            </span>
            <span className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA]">
              Due {formatDate(invoice.paymentDue)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[12px] text-[#858BB2] dark:text-white">
              {invoice.clientName}
            </span>
          </div>

          <div className="flex flex-col justify-end">
            <span className="text-[16px] font-bold dark:text-white">
              £ {invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-end items-center">
            <StatusBadge status={invoice.status} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard;
