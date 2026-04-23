const StatusBadge = ({ status }) => {
  // Requirement: Clearly reflect status through color and style
  const styles = {
    paid: "bg-[#33d69a14] text-[#33D69A]",
    pending: "bg-[#ff8f0014] text-[#FF8F00]",
    // Enhanced draft colors for better contrast in both modes
    draft: "bg-[#373b5314] dark:bg-[#dfe3fa0f] text-[#373B53] dark:text-[#DFE3FA]",
  };

  const dotStyles = {
    paid: "bg-[#33D69A]",
    pending: "bg-[#FF8F00]",
    draft: "bg-[#373B53] dark:bg-[#DFE3FA]",
  };

  return (
    <div 
      className={`flex items-center justify-center gap-2 w-[104px] h-[40px] rounded-md font-bold capitalize text-[12px] transition-colors ${styles[status]}`}
      role="status"
      aria-label={`Invoice status: ${status}`}
    >
      {/* The Status Dot */}
      <div 
        className={`w-2 h-2 rounded-full ${dotStyles[status]}`} 
        aria-hidden="true" 
      />
      {status}
    </div>
  );
};

export default StatusBadge;