const FormItem = ({ item, index, onUpdate, onDelete, errors }) => {
  // Selectively check for errors based on index
  const isNameInvalid = errors[`item-${index}-name`];
  const isQtyInvalid = errors[`item-${index}-qty`];
  const isPriceInvalid = errors[`item-${index}-price`];

  const getBorderClass = (isInvalid) => 
    `input-style transition-all ${isInvalid ? 'border-[#EC5757] dark:border-[#EC5757]' : 'focus:border-[#7C5DFA]'}`;

  const handleNumberChange = (field, value) => {
    // Allows empty string for typing, otherwise ensures it's a valid number
    const numValue = value === '' ? 0 : Number(value);
    onUpdate(index, field, numValue);
  };

  // Calculate total locally to ensure it updates instantly as user types
  const calculatedTotal = (item.quantity * item.price).toFixed(2);

  return (
    <div className="grid grid-cols-12 md:grid-cols-[2.5fr_0.6fr_1fr_0.8fr_auto] gap-4 items-center mb-12 md:mb-4 animate-in fade-in slide-in-from-left-2 duration-300 px-1">
      
      {/* Item Name */}
      <div className="col-span-12 md:col-span-1 flex flex-col gap-2">
        <label className="md:hidden label-style">Item Name</label>
        <input 
          type="text"
          className={getBorderClass(isNameInvalid)} 
          value={item.name} 
          onChange={(e) => onUpdate(index, 'name', e.target.value)} 
        />
      </div>

      {/* Qty */}
      <div className="col-span-3 md:col-span-1 flex flex-col gap-2">
        <label className="md:hidden label-style">Qty.</label>
        <input 
          type="number" 
          className={`${getBorderClass(isQtyInvalid)} text-center px-2`} 
          value={item.quantity === 0 ? '' : item.quantity} 
          onChange={(e) => handleNumberChange('quantity', e.target.value)} 
        />
      </div>

      {/* Price */}
      <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
        <label className="md:hidden label-style">Price</label>
        <input 
          type="number" 
          step="0.01"
          className={getBorderClass(isPriceInvalid)} 
          value={item.price === 0 ? '' : item.price} 
          onChange={(e) => handleNumberChange('price', e.target.value)} 
        />
      </div>

      {/* Total - Dynamic Calculation */}
      <div className="col-span-3 md:col-span-1 flex flex-col gap-2">
        <label className="md:hidden label-style">Total</label>
        <div className="flex items-center h-[48px] font-bold text-[#888EB0] dark:text-[#DFE3FA] text-[12px] pt-1">
          {calculatedTotal}
        </div>
      </div>

      {/* Delete Button */}
      <div className="col-span-2 md:col-span-1 flex justify-end md:pt-1 pt-6">
        <button 
          type="button" 
          onClick={() => onDelete(index)} 
          aria-label="Delete item"
          className="group transition-all p-2"
        >
          <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H3.194a1.777 1.777 0 01-1.777-1.778V3.556h10.166zM9.473 0l.888.889h3.111v1.778H.028V.889h3.111L4.028 0h5.445z" 
              fill="#888EB0" 
              className="group-hover:fill-[#EC5757] transition-colors"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormItem;