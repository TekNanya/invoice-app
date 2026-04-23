import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import InvoiceForm from './components/Form/InvoiceForm';
import Home from './pages/Home';
import InvoiceDetail from './pages/InvoiceDetail';
import initialData from './data/data.json';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
 
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    if (saved) {
      const parsed = JSON.parse(saved);
     
      return parsed.length > 0 ? parsed : initialData; 
    }
    return initialData; 
  });

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setIsFormOpen(false);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) => 
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] flex flex-col lg:flex-row font-spartan transition-colors duration-300">
        <Sidebar />
        
        <AnimatePresence>
          {isFormOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40" 
                onClick={() => setIsFormOpen(false)} 
              />
              <InvoiceForm onClose={() => setIsFormOpen(false)} onSubmit={addInvoice} />
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 pt-[72px] lg:pt-0 lg:pl-[103px]">
          <Routes>
            <Route path="/" element={<Home invoices={invoices} onNewInvoice={() => setIsFormOpen(true)} />} />
            <Route path="/invoice/:id" element={<InvoiceDetail invoices={invoices} onDelete={deleteInvoice} onUpdate={updateInvoice} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;