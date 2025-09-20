/**
 * Date Formatter Utility
 * Provides functions for formatting dates in human readable formats
 * 
 * @module DateUtils
 */

/**
 * Formats a date string into a human-readable relative time format
 * @param {string} dateString - ISO date string to format
 * @returns {string} Formatted date string (e.g., "Updated 2 days ago")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "Updated 1 day ago";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
  
  return `Updated ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  })}`;
};

/**
* Formats a date string into a standard format (e.g., "January 15, 2023")
* @param {string} dateStr - ISO date string to format
* @returns {string} Formatted date string
*/
export const formatStandardDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
  });
};

// Keep your original format function if you want to maintain backward compatibility
/**
* Formats a date string into a human-readable format (original implementation)
* @param {string} dateStr - ISO date string
* @returns {string} Formatted date string
*/
export const format = (dateStr) => {
  const date = new Date(dateStr);
  return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
  })}`;
};

// Export as default for backward compatibility
export default {
  format,
  formatDate,
  formatStandardDate
};