// utils/date.js
function formatDate(date) {
  return new Date(date).toISOString().split('T')[0]; // e.g., 2025-06-02
}

module.exports = { formatDate };
