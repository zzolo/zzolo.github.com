/**
 * General utils
 */

function documentReady(callback) {
  if (document.readyState != "loading") {
    callback();
  }
  else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

// Exports
export {
  documentReady
};
