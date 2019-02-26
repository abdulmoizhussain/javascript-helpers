// Call Fetch method with timeout functionality :)
// Help taken from:
// https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
// https://github.com/github/fetch/issues/175
// https://gist.github.com/davej/728b20518632d97eef1e5a13bf0d05c7
// https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/

const fetch = require("node-fetch");
const AbortController = require("abort-controller");

// Clearing a timeoutId is necessary because Node does not leave terminal until a setTimeout() is called or cleared.

// Can NOT exclude timeout in this approach. Some timeout must be given or default will be provided.
const defaultTimeout = 6000;
const _timeoutWithoutAbort = (url, options = {}) => {
  let timeoutId = 0;
  return Promise.race([
    new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error("Request Timeout")),
        ((!("timeout" in options)) || options.timeout < 1) ? defaultTimeout : options.timeout);
    }),
    new Promise((resolve, reject) => {
      fetch(url, options)
        .then(resolve)
        .catch(reject)
        .finally(() => timeoutId && clearTimeout(timeoutId));
    })
  ]);
};

// "See AbortController page on MDN"
// https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// "...This "polyfill" doesn't actually close the connection when the request is aborted, but it will call .catch() with err.name == 'AbortError' instead of .then()..."
// says: https://github.com/mo/abortcontroller-polyfill/

// Can exclude timeout in this approach when none is provided.
const _timeoutWithAbort = (url, options = {}) =>
  new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch(url, { signal, ...options });
    let timeoutId = 0;

    if ("timeout" in options && options.timeout > 0) {
      timeoutId = setTimeout(() => controller.abort(), options.timeout);
    }
    fetchPromise
      .then(resolve)
      .catch(reject)
      .finally(() => timeoutId && clearTimeout(timeoutId));
  });

module.exports = _timeoutWithAbort;
