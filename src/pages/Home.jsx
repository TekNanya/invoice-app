import { useState } from 'react';
import Filter from '../components/Filter';
import InvoiceCard from '../components/InvoiceCard';
import EmptyState from '../components/EmptyState';

const Home = ({ invoices, onNewInvoice }) => {
  const [activeFilters, setActiveFilters] = useState([]);

 
  const filteredInvoices = invoices?.filter((invoice) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.includes(invoice.status);
  }) || [];


  const getHeaderText = () => {
    const count = filteredInvoices.length;
    if (count === 0) return 'No invoices';

    return (
      <>
       
        <span className="hidden md:inline">
          There are {count} total invoices
        </span>
       
        <span className="md:hidden">
          {count} invoice{count !== 1 ? 's' : ''}
        </span>
      </>
    );
  };

  return (
    <div className="max-w-[730px] mx-auto px-6 py-8 md:py-14 lg:py-18 font-spartan">
      <header className="flex justify-between items-center mb-8 md:mb-14 lg:mb-16">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-bold dark:text-white tracking-tight">
            Invoices
          </h1>
          <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[12px] mt-1">
            {getHeaderText()}
          </p>
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <Filter 
            activeFilters={activeFilters} 
            onFilterChange={setActiveFilters} 
          />

       
          <button 
            onClick={onNewInvoice}
            className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white p-1.5 pr-4 md:pr-5 rounded-full font-bold flex items-center gap-2 md:gap-4 transition-colors"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.313 10.036V6.313h3.723L10.036 4.69H6.313V.967H4.69v3.723H.967v1.623H4.69v3.723z" fill="#7C5DFA" />
              </svg>
            </div>
            <span className="text-[12px] text-white">
              New <span className="hidden md:inline">Invoice</span>
            </span>
          </button>
        </div>
      </header>

      <section>
        {filteredInvoices.length === 0 ? (
          <EmptyState /> 
        ) : (
          <div className="flex flex-col gap-4 pb-20">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;