export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).replace(/,/g, ''); 
};

export const calculateDueDate = (startDate, days) => {
  if (!startDate) return '';
  const date = new Date(startDate);
  date.setDate(date.getDate() + Number(days));
  return date.toISOString().split('T')[0]; 
};