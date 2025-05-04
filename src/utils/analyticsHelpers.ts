
/**
 * Utility functions for analytics data processing
 */

/**
 * Format large numbers to be more readable
 * @param num Number to format
 * @param digits Number of decimal digits to show
 */
export const formatNumber = (num: number, digits = 1): string => {
  if (num === null || num === undefined) return "N/A";
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(digits)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(digits)}K`;
  }
  return num.toString();
};

/**
 * Calculate percentage change between two values
 * @param current Current value
 * @param previous Previous value
 */
export const calculatePercentChange = (current: number, previous: number): string => {
  if (!previous) return "+∞%";
  
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
};

/**
 * Determine color based on trend (positive or negative)
 * @param value Value to check
 * @param isHigherBetter Whether higher values are better
 */
export const getTrendColor = (value: number, isHigherBetter = true): string => {
  if (value === 0) return "text-muted-foreground";
  
  if ((value > 0 && isHigherBetter) || (value < 0 && !isHigherBetter)) {
    return "text-green-500";
  }
  return "text-red-500";
};

/**
 * Format date for consistent display
 * @param date Date to format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

/**
 * Generate a random ID for various uses
 * @param length Length of the ID
 */
export const generateId = (length = 8): string => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Capitalize first letter of a string
 * @param str String to capitalize
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
