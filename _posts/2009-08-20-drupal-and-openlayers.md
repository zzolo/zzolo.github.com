---
layout: default
title: Drupal and OpenLayers
created: 1250822008
---
We have just released the first beta of the [Drupal OpenLayers module](http://drupal.org/project/openlayers).  It's been a pretty crazy adventure as to how we got here, and there are still high hopes for the future.  This post is going to be a long one, and should give you the complete introduction to this new mapping module for Drupal, and will also build on and borrow from [my previous post on building this module](http://zzolo.org/thoughts/building-module).

* [Jump to Project Page](http://drupal.org/project/openlayers)
* [Check out the Demo](http://sandbox.zzolo.org/node/5)
* [Read Documentation](http://cvs.drupal.org/viewvc.py/drupal/contributions/modules/openlayers/docs/?pathrev=DRUPAL-6--1)

### What is OpenLayers? ###

[OpenLayers](http://openlayers.org/) is a free, [open-source](http://en.wikipedia.org/wiki/Open_source) [Javascript](http://en.wikipedia.org/wiki/JavaScript) library that provides an easy interface to bring together any sort of map tiles, markers, features, and other [GIS](http://en.wikipedia.org/wiki/Geographic_information_system) goodness.  OpenLayers was initially developed by [MetaCarta](http://www.metacarta.com/); it is now a project of the [Open Source Geospatial Foundation](http://www.osgeo.org/).  Think [Google Maps](http://maps.google.com/) but open-source.  The OpenLayers has many [examples](http://openlayers.org/dev/examples/) and a [gallery of sites](http://gallery.openlayers.org/).

### Where Drupal Fits In ###

[Drupal](http://drupal.org) is a great content management system and development framework.  OpenLayers fits well into this because it basically is a really great visualization tool for content (the most obvious visualization being maps).  Drupal can provide the ability to create and management data/content and OpenLayers can be a fun vehicle to displaying that content and provide a rich interface for your users.

### Main Features and Modules ###

The Drupal OpenLayers module is actually a full suite of modules that provide many integration points with other contributed modules.

* At is core, the **OpenLayers API** module provides just enough to take a map array in PHP and render it through hooks, pass it to javascript where it can interact with events, and display a working map to the page.  The main API module also manages the basics of map presets.
* The **OpenLayers Preset User Interface** module provides a web based interface to manage presets.  Presets are basically just named map arrays that are either stored in code or in the database.  With presets it becomes easy to provide interfaces to pick maps.
* **OpenLayers Layers** modules provides a wide range of layers to use outside the simple default, like Yahoo, Google, OpenStreetMap tiles, and more.  Layers can be manually put into map arrays, but with hooks, other modules can provided named layers that get put together when the map is rendered.
* Much like the layers module, the **OpenLayers Behaviors** module provides a set of behavior add-ons that can easily be added to map arrays.  These include things like feature controls, fullscreen controls, popups, and tooltips.
* On the input side, there is the **OpenLayers CCK** module which provides integration with OpenLayers and CCK.  This module provides a field and widget for basic WKT input, as well as a widget for the Geo module; both of which allow the user to use a map to enter features like points, lines, and polygons.  On the formatter side, you can display any preset map for the field.
* A simple way to display a map is to use the **OpenLayers Filter** module, which provides an input format filter where a user can input <code>[openlayers preset_name]</code> into the body content of a node and it will be rendered as that map.
* Finally, there is a Views plugin provided by the **OpenLayers Views** module that allows the user to aggregate all kinds of Drupal data and put it into a map.

### The History and the Code ###

The OpenLayers module has gone from [some fancy javascript that goes over the Geo module](http://drupal.org/project/geo_gui) to a robust suite of modules that provides a complete mapping solution in Drupal all in the span of about five (5) months.  [Phayes](http://drupal.org/user/47098) released the [Geo Gui](http://drupal.org/project/geo_gui), [literally the day](http://groups.drupal.org/node/20475) [bdragon](http://drupal.org/user/53081) and I had planned on going in the same direction with OpenLayers.  Phayes was eager to combine our effort, and with the combination of his javascript skills and my Drupal skills, we created a much more Drupal-friendly solution involving CCK widgets and PHP map arrays.  Then it went form there:

1. The map array was definitely directly influenced by the [GMap](http://drupal.org/project/gmap) module.  
1. We then started with a [Views](http://drupal.org/project/views) plugin which borrowed from [GMap](http://drupal.org/project/gmap) and [Mapstraction](http://drupal.org/project/mapstraction).  
1. At the same time, we started abstracting out layers and layers handlers so that other modules could provide them, and so we could keep the main API module as lean as possible.  
1. Phayes then took out the features stuff we had written and started off on the idea of behaviors.  
1. Then, as I was getting highly frustrated with my silly idea of a reusable form for creating maps, [ImageCache](http://drupal.org/project/imagecache) provided me with the idea of a preset interface and a single point to create maps; this meant we could simply use a dropdown to pick maps in other interfaces.  It was a big refactoring, but well worth it in the end.
1. We then abstracted out styles, so that themers could style features easier.
1. At that point [tmcw](http://drupal.org/user/12664), [rsoden](http://drupal.org/user/226437), and [brynbellomy](http://drupal.org/user/537416) provided some patches and we got a couple co-maintainers.
1. brynbellomy helped make grouping in the views plugin work, among others.
1. tmcw added the [Features](http://drupal.org/project/features) integration.
1. And many more small and big improvements...

Overall, with the help of other Drupal modules, we have been able to create an efficient set of tools that are exportable, sustainable, secure, easy-to-use, efficient, and very hookable, thanks to the hardwork of some great developers.

### Development ###

I have really enjoyed the process of creating this module.  Phayes and I have had many discussions about where we see this module going, and bringing in new developers has opened up the discussion.  We started early on putting our discussion in [this really long issue](http://drupal.org/node/432642).  I have learned a whole lot of new things by coding this module and from the other developers.  I really appreciate and value the open development process that we have embraced and encourage it for other module developers where possible.

### Documentation ###

The documentation for this module still needs some work, but we have always had a goal of creating a fair amount of inline documentation, thus making it easy to get a good base of documentation in the module itself.  The following files are found in the <code>docs</code> folder:

* [openlayers.api.php](http://cvs.drupal.org/viewvc.py/drupal/contributions/modules/openlayers/docs/openlayers.api.php?view=markup&amp;pathrev=DRUPAL-6--1) provides doxygen formatted documentation for the hooks that are available for the module.
* [API.txt](http://cvs.drupal.org/viewvc.py/drupal/contributions/modules/openlayers/docs/API.txt?view=markup&amp;pathrev=DRUPAL-6--1) describes the public API for the module.
* [THEMING.txt](http://cvs.drupal.org/viewvc.py/drupal/contributions/modules/openlayers/docs/THEMING.txt?view=markup&amp;pathrev=DRUPAL-6--1) is an easy reference to the theming functions that are available.
* [MAP_ARRAY.txt](http://cvs.drupal.org/viewvc.py/drupal/contributions/modules/openlayers/docs/MAP_ARRAY.txt?view=markup&amp;pathrev=DRUPAL-6--1) is an unfinished description of whats available for the map array.  There is a lot to it, so we are still discussing the best, sustainable way to provide this documentation.

### What is Left for a Stable Release ###

Our goal is to get a 1.0 out as soon as possible; I personally, don't like how many modules sit in beta or alpha for so long (and yes, I am a hypocrite).  Still, we have a pretty good road-map laid out to get a good stable release out.  The following are the main things that are in the way of a release:

* Squashing any bugs
* Testing
  * We need people to start using the module and see how it works for them
  * I also want to have at least a few SimpleTests done before a stable release
* Documentation
  * Text-based documentation in the module needs to be finished up
  * It would probably be better to push documentation to [Advanced Help](http://drupal.org/project/advanced_help)
  * Any further documentation like handbook pages or screencasts would be wonderful
* Stylish Controls
  * My personal goal is to get some stylish controls for the module to have by default.  OpenLayers default controls are alright, but they won't win any hearts, and design goes a long way.
  * Any designers out there want to help?  (I have little to no design skills)

### Try It Out ###

I have set up the OpenLayers module on my [sandbox site](http://sandbox.zzolo.org/).  From the [main OpenLayers demo page](http://sandbox.zzolo.org/node/5) you can pretty much use the whole module without having to download it.

* [Check out the main administrative settings](http://sandbox.zzolo.org/admin/settings/openlayers)
* [Look at the preset list](http://sandbox.zzolo.org/admin/settings/openlayers/presets)
* [Add a new preset](http://sandbox.zzolo.org/admin/settings/openlayers/presets/add)
* [Create content that allows for inline maps](http://sandbox.zzolo.org/node/add/openlayers-example)
* [Create data with OpenLayers CCK map](http://sandbox.zzolo.org/node/add/openlayers-cck-wkt-example)
* [OpenLayers views example](http://sandbox.zzolo.org/openlayers-views-example) (No access to the views UI)

### Better Than the UI ###

Having talked with people trying to use this module, there is one hint I would like to provide.  Once you get into the module and the interface, and also look at the map array, you will notice that the preset interface does not provide all the options that the map array can handle.  Ideally we don't want this to be true, but there are lots of options.  Still, there is a fairly easy way to get all the functionality you need into a preset, by using the <code>hook_openlayers_presets()</code> hook.  For example:


<div>
{% highlight php %}
/**
 * Implementation of hook_openlayers_presets().
 */
function example_openlayers_presets() {
  // This is an example implementation where we do some stuff
  // in our map array that the interface does not provide

  $presets = array();

  // Create map array
  $awesome_map = array(
    'projection' => '4326',
    'width' => 'auto',
    'default_layer' => 'openlayers_default_wms',
    'height' => '300px',
    'center' => array(
      'lat' => '0',
      'lon' => '0',
      'zoom' => '2',
    ),
    'options' => array(
      'displayProjection' => '4326',
    ),
    'controls' => array(
      'LayerSwitcher' => TRUE,
      'Navigation' => TRUE,
      'PanZoomBar' => TRUE,
      'MousePosition' => TRUE,
    ),
  );

  // Create full preset array
  $presets['our_awesome_map'] = array(
    'preset_name' => 'our_awesome_map',
    'preset_title' => t('Our Awesome Map'),
    'preset_description' => t('This map will be available in the preset interface and can even be cloned.'),
    'preset_data' => $awesome_map,
  );

  return $presets;
}
{% endhighlight %}
</div>


So, now we have this preset available in the preset interface where it can be cloned and edited and used in views and cck formatters!

Another important hook is the <code>hook_openlayers_map_alter(&amp;map)</code> where you can completely change around maps right before it gets rendered.  This is helpful if you want to add a new event to all maps or add a manual layer to a map.

### Into the Future ###

We still have a little ways to go, but this module is ready to be broken in and tested out.  We encourage to try to break and push the limits of this module and let us know about new features.  We also welcome patches.

We have already started looking at 2.0 or 1.x features.  Some of the things being talked about are the following:

* Abstracting out hook implementation completely with a hook_openlayers_api() like Views does.
* Ability to manage layer options easier, which would help with using the WMS reader in Nice Maps
* Putting more options in the preset form
* Allowing more behaviors in the View plugin
* Creating a better and more robust structure for bringing in external data
* Whatever you can think of...
