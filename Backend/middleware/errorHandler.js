// server/middleware/errorHandler.js

// A centralized Express error handler
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // Include stack only in development for debugging
    stack: process.env.NODE_ENV === 'production' ? '🥞 Hidden' : err.stack,
  });
};

module.exports = errorHandler;
