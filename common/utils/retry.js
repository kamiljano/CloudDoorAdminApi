'use strict';

const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 1000;

module.exports = async(action, maxAttempts = DEFAULT_RETRY_ATTEMPTS, timeout = DEFAULT_TIMEOUT) => {
  let attempt = 0;
  let lastError;
  do {
    try {
      return await action();
    } catch (err) {
      console.warn(`Operation failed. Retrying in ${timeout} milliseconds. Error: ${err}`);
      lastError = err;
      attempt++;
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, timeout));
      }
    }
  } while (attempt < maxAttempts);

  throw lastError;
};