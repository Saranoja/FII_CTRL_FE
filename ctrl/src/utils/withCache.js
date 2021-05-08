import differenceInSeconds from 'date-fns/differenceInSeconds';

// we were caching the response previously but ideally we should be caching
// the request.

/**
 *
 * @param {function} promiseFn - promise function
 * @param {number} expiryTime - expiry time of cache in seconds
 *
 */
if (typeof window !== 'undefined') window.internalCache = {};

export const clearInternalCache = (key = null) => {
  if (key) {
    window.internalCache[key] = undefined;
    return;
  }
  window.internalCache = {};
};

const simpleCache = {};

// name could possibly be more explicit - can't think of a better one now
export const withSimpleCache = (fn, expiryTime = 600) => {
  return (...args) => {
    const key = JSON.stringify(args);
    const now = Date.now();
    if (simpleCache[key]) {
      const diff = differenceInSeconds(now, simpleCache[key].timestamp);

      if (diff < expiryTime) {
        return simpleCache[key].value;
      }

      simpleCache[key].value = fn(...args);
      simpleCache[key].timestamp = now;

      return simpleCache[key].value;
    }
    simpleCache[key] = {};

    simpleCache[key].value = fn(...args);
    simpleCache[key].timestamp = now;

    return simpleCache[key].value;
  };
};

export const withCache = (promiseFn, expiryTime = 600, customKey = null) => {
  return (...args) => {
    const key = customKey || JSON.stringify(args);
    const now = Date.now();
    if (window.internalCache[key]) {
      // request not yet finished, return the promise.
      if (!window.internalCache[key].timestamp) {
        return window.internalCache[key];
      }

      const diff = differenceInSeconds(now, window.internalCache[key].timestamp);

      if (diff < expiryTime) {
        return new Promise((resolve) => resolve(window.internalCache[key].value));
      }

      window.internalCache[key] = promiseFn(...args).then((result) => {
        if (!window.internalCache[key]) window.internalCache[key] = {};
        window.internalCache[key].value = result;
        window.internalCache[key].timestamp = now;

        return result;
      });

      return window.internalCache[key];
    }
    window.internalCache[key] = promiseFn(...args).then((result) => {
      if (!window.internalCache[key]) window.internalCache[key] = {};
      window.internalCache[key].value = result;
      window.internalCache[key].timestamp = now;
      return result;
    });
    return window.internalCache[key];
  };
};

export default withCache;
