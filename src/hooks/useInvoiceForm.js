import { useState, useEffect } from 'react';
import { validateInvoice, generateId, calculateDueDate } from '../utils/invoiceHelpers';

export const useInvoiceForm = (initialData, onSubmit, onClose) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const updateField = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      if (keys.length === 1) return { ...prev, [keys[0]]: value };
      return {
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value }
      };
    });
    
    
    const lastKey = keys[keys.length - 1];
    if (errors[lastKey]) {
      const newErrors = { ...errors };
      delete newErrors[lastKey];
      setErrors(newErrors);
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0, total: 0 }]
    }));
    if (errors.items) setErrors(prev => ({ ...prev, items: undefined }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      const item = { ...newItems[index], [field]: value };
      if (field === 'quantity' || field === 'price') {
        item.total = Number(item.quantity || 0) * Number(item.price || 0);
      }
      newItems[index] = item;
      return { ...prev, items: newItems };
    });
  };

  const handleAction = (status) => {
   
    if (status !== 'draft') {
      const validationErrors = validateInvoice(formData);
      
      // Additional custom rules
      if (formData.items.length === 0) {
        validationErrors.items = "- An item must be added";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        document.querySelector('.form-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    const createdAt = initialData.id ? initialData.createdAt : formData.createdAt;
    
    const finalInvoice = {
      ...formData,
      id: initialData.id || generateId(),
      status,
      createdAt,
      paymentDue: calculateDueDate(createdAt, formData.paymentTerms),
      total: formData.items.reduce((acc, item) => acc + item.total, 0),
    };

  
    const rawData = localStorage.getItem('invoices');
    const existingInvoices = rawData ? JSON.parse(rawData) : [];
    let updatedInvoices;

    if (initialData.id) {
      updatedInvoices = existingInvoices.map(inv => inv.id === initialData.id ? finalInvoice : inv);
    } else {
      updatedInvoices = [finalInvoice, ...existingInvoices];
    }

    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    onSubmit(finalInvoice);
  };

  return { formData, errors, updateField, updateItem, addItem, removeItem, handleAction };
};