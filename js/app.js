/**
 * Main JS
 */
(function($, undefined) {
  window.zzolo = window.zzolo || {};

  // Post visualizations
  if (_.isArray(zzolo.posts)) {
    processPosts(zzolo.posts);
  }
  
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
  };
  
})(jQuery);