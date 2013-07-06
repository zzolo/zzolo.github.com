/**
 * Main JS
 */
(function($, undefined) {

  // Render icons
  $.getJSON('/data/icons.json', function(icons) {
    _.each(icons, function(path, i) {
      $('.item.' + i + ' .icon').each(function() {
        var id = _.uniqueId(i + '_');
        var $thisContainer = $(this);
        var containerW = $thisContainer.width();
        var containerH = $thisContainer.height();
        var r, p, w, h, s, x, y;
        
        $('<div>').attr('id', id).appendTo($thisContainer);
        r = Raphael(id, containerW, $thisContainer.height());
        p = r.path(path).attr({ fill: '#0099CC', stroke: 'none' });
        
        // Scale
        w = p.getBBox().width;
        h = p.getBBox().height;
        s = (h >= w) ? containerH / h : containerW / w;
        
        // Translate
        x = (containerW / 2) - (w / 2);
        y = (containerH / 2) - (h / 2);
        p.transform('T' + x + ',' + y + 'S' + (s - .14));
        
        // Hover
        p.hover(function() {
          p.g = p.glow({ color: "#B0C4DE", width: 6 });
          p.animate({ fill: '#007399' }, 1000);
        },
        function() {
          p.g.remove();
          p.animate({ fill: '#0099CC' }, 1000);
        });
      });
    });
  });
  
})(jQuery);