/**
 * General JS for all pages
 */

import { documentReady } from './utils.js';

documentReady(() => {
  // Zzolo font
  zzoloFont();

  // Encrypt with window.btoa
  let windowDecrypt = window.atob;
  if (windowDecrypt) {
    // General email
    let contactEl = document.querySelector('.web-links .gmail');
    if (contactEl) {
      contactEl.setAttribute('href', `mailto:${windowDecrypt('Y29udGFjdEB6em9sby5vcmc=')}`);
    }

    // Print email
    let printContactEl = document.querySelector('.print-email');
    if (printContactEl) {
      printContactEl.textContent = windowDecrypt('YWxhbi5wYWxhenpvbG9AZ21haWwuY29t');
    }

    // Print contact info (includes phone) at the top for printing CV.
    let fullContactEl = document.querySelector('.contact-info');
    if (fullContactEl) {
      fullContactEl.innerHTML = windowDecrypt(
        'QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ=='
      );
      }
  }
});

// zzolo font
function zzoloFont() {
  var pattern = ['z', 'z', 'o', 'l', 'o'];
  var current = 0;

  var zzoloFontKeyHandler = function (event) {
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
      current = 0;
      return;
    }

    // Update how much of the pattern is complete
    current++;

    // If complete, alert and reset
    if (pattern.length === current) {
      current = 0;
      document.querySelector('body').classList.add('zzolo-font');
    }
  };

  // Listen for keydown events
  document.addEventListener('keydown', zzoloFontKeyHandler, false);
}

