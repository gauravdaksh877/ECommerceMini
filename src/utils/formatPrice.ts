export const formatPrice = (price: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(price);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};
