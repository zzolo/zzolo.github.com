---
layout: default
title: OpenLayers Facelift
created: 1321015925
---
In the current D7 development branch of the Drupal <a href="http://drupal.org/project/openlayers">OpenLayers module</a> there are some really great interface and styling updates that will make maps a lot more exciting and more intuitive to use.

### Before

<div><a class="colorbox" href="https://img.skitch.com/20111111-qcusws78qpafsdtqb3a946hadd.jpg"><img style="max-width:615px" src="https://img.skitch.com/20111111-qcusws78qpafsdtqb3a946hadd.jpg" alt="OpenLayers | openlayers-6" /></a></div>

### After

<div><a class="colorbox" href="https://img.skitch.com/20111111-ry6wb4mjeqnj5bincc1faxty2c.jpg"><img style="max-width:615px" src="https://img.skitch.com/20111111-ry6wb4mjeqnj5bincc1faxty2c.jpg" alt="Clone map geojson | openlayers7" /></a></div>

The images above are screenshots (click to expand) of the default maps that currently come with the stable version of the [OpenLayers module](http://drupal.org/project/openlayers) and library (before) and then new styling for default maps in the [development branch](http://drupal.org/node/985658) (after).  Let's go through the changes:

1. **New image set** based on [MapBox](http://mapbox.com)'s image set and filled in by [ndagire](http://drupal.org/user/1378442).  This is huge!  The default image set that comes with the OpenLayers module is pretty ugly; [see for yourself](http://openlayers.org).
2. **New default feature styles**.  This was a no brainer once we got new images.  It is much better than that orange color.
3. **Provided markers** come with the modules, a combination of [ndagire](http://drupal.org/user/1378442)'s images and a couple markers I made, the module now comes with some markers out of the box.  Besides this being visually exciting, I think it will help people grok the module more easily.
4. **New popup** provided by [Harris Rashid](http://drupal.org/user/148227) which goes very well with the new image set.
5. **New map styling** to compliment the image set.  A little CSS can go a long way.
6. **New Mapquest tiles** by default.  [mikl](http://drupal.org/user/58679) helped get this tile set into the module core.  And though it was tough to let go of the [OpenStreetMap](http://openstreetmap.org) default tileset, the [MapQuest](http://developer.mapquest.com/web/products/open/map) tiles are actually based off the OpenStreetMap data, don't require a third-party library, are free, and look so much better!
7. **Wrap dateline** (not numbered) is when the tiles repeat themselves as they go past the [International Date Line](http://en.wikipedia.org/wiki/International_Date_Line) which means as you pan east or west, it keeps going.  This is a bit nerdy, but it means that the map fills up the area completely and looks much better.

So, all in all, an amazing improvement to what was a mediocre visual experience out of the box.  I am really taken back by the contributions of the community to make this happen.  And considering that I have talked twice about Making Beautiful Maps in Drupal both [here](http://chicago2011.drupal.org/sessions/making-beautiful-maps) and [here](http://2011.badcamp.net/program/sessions/making-beautiful-maps-drupal), it was about time this became more of a reality.

### Map Previews

I have also been adding some interface improvements to the **OpenLayers UI** module that comes with the main core module.  If you look at the _After_ image above, you'll notice it says "Preview".  The map building interface now has a preview button so that you can see the map before you even save it (data and all).  This is really great, as before you had to save the map, then go to the display page (done with the Views module), just to see if it worked.  I can't believe I hadn't done this earlier.

### Style Previews

When listing styles in the OpenLayers UI, you will now see a marker preview for the styles with icons, and a little map thumbnail for vector based styling.  The icon preview was done by [Pol](http://drupal.org/user/47194) at the OpenLayers Sprint at [DrupalCon London](http://london2011.drupal.org/).  The map thumbnails are actually little OpenLayers maps that show a random place with the style on top.

<img src="https://img.skitch.com/20111111-82dbdgaeb3h8cfr6wpuy33wggj.png">

When editing styles, there is also a larger map to preview the style.  This is a larger map, but same principle as the list.  This also contains crosshairs so that you can see how the style is centered on the feature it is representing.

<img src="https://img.skitch.com/20111111-bbh1ujsa4uw9w3impdus9wbg2q.png">

### Layer Previews

Coming soon.  This is not implemented yet, and a bit harder to accomplish as often layers require maps to be certain ways.  But I think we can still have this doable for the majority of layers.

### Testing

All this work and more is currently in the development branch.  There are some known bugs.  Any help testing out would be greatly appreciated.  Please put any bugs into the [issue queue](http://drupal.org/project/issues/openlayers).  I am hoping to have some time over Thanksgiving to follow through with this sprint and get out another release (probably the final alpha).
