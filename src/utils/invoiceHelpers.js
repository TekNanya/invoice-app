export const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let id = "";
  for (let i = 0; i < 2; i++) id += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 4; i++) id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  return id;
};

export const calculateDueDate = (startDate, days) => {
  if (!startDate) return '';
  const date = new Date(startDate);
  date.setDate(date.getDate() + Number(days));
  return date.toISOString().split('T')[0];
};


export const validateInvoice = (data) => {
  const errors = {};
  const emailRegex = /\S+@\S+\.\S+/;

  // 1. Helper for empty strings
  const isEmpty = (val) => !val || val.toString().trim() === '';

  // 2. Sender Address Validation
  if (isEmpty(data.senderAddress.street)) errors.senderStreet = "can't be empty";
  if (isEmpty(data.senderAddress.city)) errors.senderCity = "can't be empty";
  if (isEmpty(data.senderAddress.postCode)) errors.senderPostCode = "can't be empty";
  if (isEmpty(data.senderAddress.country)) errors.senderCountry = "can't be empty";

  // 3. Client Details Validation
  if (isEmpty(data.clientName)) errors.clientName = "can't be empty";
  if (isEmpty(data.clientAddress.street)) errors.clientStreet = "can't be empty";
  if (isEmpty(data.clientAddress.city)) errors.clientCity = "can't be empty";
  if (isEmpty(data.clientAddress.postCode)) errors.clientPostCode = "can't be empty";
  if (isEmpty(data.clientAddress.country)) errors.clientCountry = "can't be empty";

  // 4. Email Validation
  if (isEmpty(data.clientEmail)) {
    errors.clientEmail = "can't be empty";
  } else if (!emailRegex.test(data.clientEmail)) {
    errors.clientEmail = "invalid format";
  }

  // 5. Project Description
  if (isEmpty(data.description)) errors.description = "can't be empty";

  // 6. Item List Validation
  if (!data.items || data.items.length === 0) {
    errors.itemList = "An item must be added";
  } else {
    data.items.forEach((item, index) => {
      if (isEmpty(item.name)) errors[`item-${index}-name`] = "empty";
      if (item.quantity <= 0) errors[`item-${index}-qty`] = "invalid";
      if (item.price <= 0) errors[`item-${index}-price`] = "invalid";
    });
  }

  return errors;
};