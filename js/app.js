/**
 * Main JS
 */
(function($, _, chroma, Ractive) {
  window.zzolo = window.zzolo || {};

  $(document).ready(function() {
    // Post visualizations
    if (_.isArray(zzolo.posts)) {
      //processPosts(zzolo.posts);
    }

    // Haikus
    if ($('body').hasClass('haikus')) {
      processHaikus();
    }
  });

  // Process posts for visualization
  function processPosts(posts) {
    var min, max, colorScale;

    // Make timestampes and get min/mx
    posts = _.map(posts, function(p) {
      var m = moment(p.date);

      p.timestamp = m.unix();
      p.year = m.year();
      return p;
    });

    // Colorize
    _.each(_.groupBy(posts, 'year'), function(y, year) {
      min = moment(year + '-01-01').unix();
      max = moment(year + '-12-31').unix();
      colorScale = chroma.scale(['#DEDCAB', '#533324'])
        .domain([min, max])
        .mode('lab');

      _.each(y, function(p) {
        $('[data-id="' + p.id + '"] .visual-date').addClass('processed')
          .css('background-color', colorScale(p.timestamp).hex());
      });
    });
  }

  // Process haikus
  function processHaikus() {
    var projectPath = '/projects/portrait_and_haiku/';
    var ractive = new Ractive({
      el: $('#haikus-container'),
      template: $('#template-haikus').html(),
      data: {}
    });

    // Get data first
    $.getJSON(projectPath + 'data/haikus.json', function(haikus) {
      haikus = _.map(haikus, function(h) {
        h.date = moment(h.date);
        h.portrait = projectPath + 'images/' + h.portrait;
        h.haiku = h.haiku.replace(new RegExp('\n', 'g'), '<br>');
        return h;
      });
      haikus = _.sortBy(haikus, function(h) {
        return h.date.unix();
      });
      ractive.set('haikus', haikus);
    });
  }

})(jQuery, _, chroma, Ractive);
