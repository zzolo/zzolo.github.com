/**
 * Main JS
 */
(function ($, _, chroma, Ractive) {
  window.zzolo = window.zzolo || {};

  $(document).ready(function () {
    // Haikus
    if ($('body').hasClass('haikus')) {
      processHaikus();
    }

    // Zzolo font
    zzoloFont();
  });

  // Process haikus
  function processHaikus() {
    var projectPath = '/projects/portrait_and_haiku/';
    var ractive = new Ractive({
      el: $('#haikus-container'),
      template: $('#template-haikus').html(),
      data: {}
    });

    // Get data first
    $.getJSON(projectPath + 'data/haikus.json', function (haikus) {
      haikus = _.map(haikus, function (h) {
        h.date = moment(h.date);
        h.portrait = projectPath + 'images/' + h.portrait;
        h.haiku = h.haiku.replace(new RegExp('\n', 'g'), '<br>');
        return h;
      });
      haikus = _.sortBy(haikus, function (h) {
        return h.date.unix();
      });
      ractive.set('haikus', haikus);
    });
  }

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

  // Print contact info
  if (window.atob) {
    $('.contact-info').html(
      window.atob(
        'QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ=='
      )
    );
  }
})(jQuery, _, chroma, Ractive);
