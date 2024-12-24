export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const validatePrice = (price: number): boolean => {
  return price >= 0 && Number.isFinite(price);
};