import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Filter = ({ activeFilters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  
  // The statuses defined in the requirements
  const statuses = ['draft', 'pending', 'paid'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (status) => {
    if (activeFilters.includes(status)) {
      onFilterChange(activeFilters.filter((f) => f !== status));
    } else {
      onFilterChange([...activeFilters, status]);
    }
  };

  return (
    <div className="relative" ref={filterRef}>
      {/* FILTER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 group focus:outline-none"
      >
        <span className="text-[12px] font-bold dark:text-white transition-colors group-hover:text-[#7E88C3]">
          Filter <span className="hidden md:inline">by status</span>
        </span>
        
        {/* ARROW ICON - SVG included directly so it never fails to load */}
        <motion.svg 
          width="11" 
          height="7" 
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="transition-transform duration-300"
        >
          <path d="M1 1l4.22 4.22L9.44 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </motion.svg>
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[192px] bg-white dark:bg-[#252945] shadow-xl rounded-lg p-6 z-20"
          >
            <div className="flex flex-col gap-4">
              {/* Optional: "All" clear button logic */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-4 h-4 bg-[#DFE3FA] dark:bg-[#1E2139] rounded-[2px] checked:bg-[#7C5DFA] border border-transparent transition-all cursor-pointer"
                    checked={activeFilters.length === 0}
                    onChange={() => onFilterChange([])} // Clears all filters
                  />
                  <svg className="absolute w-2.5 h-2 pointer-events-none hidden peer-checked:block" viewBox="0 0 10 8">
                    <path d="M1.5 4.5l2.5 2.5 4.5-4.5" stroke="#FFF" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold capitalize dark:text-white group-hover:text-[#7C5DFA]">
                  All
                </span>
              </label>

              {/* Dynamic Statuses */}
              {statuses.map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 bg-[#DFE3FA] dark:bg-[#1E2139] rounded-[2px] checked:bg-[#7C5DFA] border border-transparent transition-all cursor-pointer"
                      checked={activeFilters.includes(status)}
                      onChange={() => handleCheckboxChange(status)}
                    />
                    <svg className="absolute w-2.5 h-2 pointer-events-none hidden peer-checked:block" viewBox="0 0 10 8">
                      <path d="M1.5 4.5l2.5 2.5 4.5-4.5" stroke="#FFF" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-bold capitalize dark:text-white group-hover:text-[#7C5DFA]">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;