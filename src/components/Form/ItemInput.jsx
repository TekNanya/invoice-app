const ItemInput = ({ item, index, onUpdate, onDelete, error }) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center mb-4 md:mb-2 animate-in fade-in slide-in-from-left-2">
      {/* Name */}
      <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
        <label className="md:hidden text-[12px] text-[#7E88C3]">Item Name</label>
        <input 
          className={`form-input ${error ? 'border-[#EC5757]' : ''}`} 
          value={item.name} 
          onChange={(e) => onUpdate(index, 'name', e.target.value)} 
        />
      </div>

      {/* Qty */}
      <div className="col-span-3 md:col-span-2 flex flex-col gap-2">
        <label className="md:hidden text-[12px] text-[#7E88C3]">Qty.</label>
        <input 
          type="number" 
          className="form-input text-center px-1" 
          value={item.quantity} 
          onChange={(e) => onUpdate(index, 'quantity', e.target.value)} 
        />
      </div>

      {/* Price */}
      <div className="col-span-4 md:col-span-3 flex flex-col gap-2">
        <label className="md:hidden text-[12px] text-[#7E88C3]">Price</label>
        <input 
          type="number" 
          className="form-input" 
          value={item.price} 
          onChange={(e) => onUpdate(index, 'price', e.target.value)} 
        />
      </div>

      {/* Total */}
      <div className="col-span-3 md:col-span-2 flex flex-col gap-2">
        <label className="md:hidden text-[12px] text-[#7E88C3]">Total</label>
        <span className="h-[48px] flex items-center font-bold text-[#888EB0] dark:text-[#DFE3FA]">
          {item.total?.toFixed(2)}
        </span>
      </div>

      {/* Delete Icon */}
      <button 
        type="button" 
        onClick={() => onDelete(index)} 
        className="col-span-2 md:col-span-1 flex justify-end pt-6 md:pt-0 group"
      >
        <svg width="13" height="16" className="fill-[#888EB0] group-hover:fill-[#EC5757] transition-colors">
          <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H3.194a1.777 1.777 0 01-1.777-1.778V3.556h10.166zM9.473 0l.888.889h3.111v1.778H.028V.889h3.111L4.028 0h5.445z"/>
        </svg>
      </button>
    </div>
  );
};