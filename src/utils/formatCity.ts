/**
 * Formats a city name by capitalizing the first letter of each word
 * and converting the rest to lowercase
 */
export const formatCity = (city: string): string => {
  if (!city) return '';
  return city
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
