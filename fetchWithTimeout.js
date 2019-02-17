// Call Fetch method with timeout functionality :)
// Help taken from:
// https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
// https://github.com/github/fetch/issues/175
// https://gist.github.com/davej/728b20518632d97eef1e5a13bf0d05c7

// https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/

const fetch = require("node-fetch");
const AbortController = require("abort-controller");

// Can NOT exclude timeout in this approach. Some timeout must be given or default will be provided.
const defaultTimeout = 6000;
const _timeoutWithoutAbort = (url, options = {}) => Promise.race([
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request Timeout")),
      "timeout" in options && options.timeout > 0 ? options.timeout : defaultTimeout)
  ),
  fetch(url, options)
]);

// In case of higher OCD, can use the approach with AbortController Syntax
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
      timeoutId = setTimeout(() => {
        controller.abort();
      }, options.timeout);
    }
    fetchPromise
      .then((res) => {
        timeoutId && clearTimeout(timeoutId);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = _timeoutWithAbort;
