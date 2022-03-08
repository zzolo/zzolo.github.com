/**
 * General JS for all pages
 */

import { documentReady } from './utils.js';

// Global space
window.zzolo = window.zzolo || {};

documentReady(() => {
  // Zzolo font
  zzoloFont();

  // Print contact info (includes phone) at the top for printing CV
  if (window.atob) {
    document.querySelector('.contact-info').innerHTML = window.atob(
      'QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ=='
    );
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
      $('body').addClass('zzolo-font');
    }
  };

  // Listen for keydown events
  document.addEventListener('keydown', zzoloFontKeyHandler, false);
}

