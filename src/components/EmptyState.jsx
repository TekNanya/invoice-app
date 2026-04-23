const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 lg:mt-24 text-center font-spartan px-6">
      <img 
        src="/src/assets/illustration-empty.svg" 
        alt="" 
        className="mb-10 w-[193px] lg:w-[242px]"
      />
      
      <h2 className="text-[20px] lg:text-[24px] font-bold dark:text-white mb-6 tracking-[-0.63px]">
        There is nothing here
      </h2>
      
      <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[12px] leading-[15px] tracking-[-0.25px] max-w-[220px]">
        Create an invoice by clicking the <br />
        <span className="font-bold">
          {/* Only shows on Mobile (below 768px) */}
          <span className="md:hidden">New</span>
          
          {/* Shows on Tablet and Desktop (768px and up) */}
          <span className="hidden md:inline">New Invoice</span>
        </span> button and get started
      </p>
    </div>
  );
};

export default EmptyState;