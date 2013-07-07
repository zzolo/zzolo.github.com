---
layout: post
title: Building a Module
created: 1240282876
---

I was asked to do a [presentation on coding in Drupal](http://groups.drupal.org/node/20563) for our [local Drupal user group](http://groups.drupal.org/twin-cities).  "Coding" is a pretty general topic, and the audience at our user group is pretty varied.  So, I was not sure what specifically I should present that would encompass "coding".  As the time came along and I had to make a decision, I looked to the module that I currently spend most of my free time developing: [OpenLayers](http://drupal.org/project/openlayers).

### What is OpenLayers?

[OpenLayers](http://openlayers.org/) is a free, [open-source](http://en.wikipedia.org/wiki/Open_source) [Javascript](http://en.wikipedia.org/wiki/JavaScript) library that provides an easy interface to bring together any sort of map tiles, markers, features, and other [GIS](http://en.wikipedia.org/wiki/Geographic_information_system) goodness.  OpenLayers was initially developed by [MetaCarta](http://www.metacarta.com/), now a project of the [Open Source Geospatial Foundation](http://www.osgeo.org/).  Think [Google Maps](http://maps.google.com/) but open-source and more accepting of other worldly GID data.  The OpenLayers has many [examples](http://openlayers.org/dev/examples/) and [gallery of sites](http://gallery.openlayers.org/).

### Where Drupal Fits In

[Drupal](http://drupal.org) is a great content management system and development framework.  OpenLayers fits well into this because it basically is a really great visualization tool for content (the most obvious visualization being maps).  Drupal can basically provide the ability to create and management data/content and OpenLayers can be a fun vehicle to displaying that content.

### The History

The [Drupal OpenLayers Module](http://drupal.org/project/openlayers) has actually been around for almost 2 years.  Started by [bdragon](http://drupal.org/user/53081), he saw early on its strength of offering a nice interface for creating [features](http://en.wikipedia.org/wiki/GIS#Vector).  His work was later merged with [crischan](http://drupal.org/user/25730).  All that was pretty much scrapped and the module was restarted once again in [late March of 2009](http://drupal.org/cvs?commit=187152).

Having worked with Brandon before, I approached him to see what he was planning with the module and if I could help out at all.  We discussed plans to create a simple [API](http://en.wikipedia.org/wiki/API) and a [CCK](http://drupal.org/project/cck) widget for the [Geo](http://drupal.org/project/geo) field.

Pretty much the day after Brandon and I talked about what we wanted to do with the module, [phayes](http://drupal.org/user/47098) [released](http://groups.drupal.org/node/20468) the [geo_gui](http://drupal.org/project/geo_gui).  I [wrote a post](http://groups.drupal.org/node/20475) about how it would be nice to have Drupal's GIS efforts a little more in sync, and Patrick was quick to respond.  

Brandon, Patrick, and I sat down in IRC and figured out quickly that we had the same goals, and that the OpenLayers module would be the more appropriate place for our efforts.  We also discovered that our skills complimented each other well, Patrick knowing GIS and Javascript well, I knowing Drupal and PHP, and Brandon being a master of all things.

### About this Discussion

This article is mostly about how we have developed this module, and what kind of practices, standards, techniques we used along the way.  Please keep in mind, at the time of this writing, we are still actively developing, and with all programming, there is always another way to do the same thing.

Some assumptions I want to make up front as we start getting into the code:

* You have built a [Drupal](http://drupal.org) site from start to finish, and understand the basic concepts of Drupal.
* You have a good understanding of important contributed modules like [Views](http://drupal.org/project/views) and [CCK](http://drupal.org/project/cck).
* You are familiar with mapping on the web, meaning you have used [Google Maps](http://maps.google.com) before.
* You know [PHP](http://php.net), meaning you know the syntax and can read it on a simple level.
* You know [Javascript](http://en.wikipedia.org/wiki/JavaScript) and [jQuery](http://jquery.com/), again, to a basic degree (being able to read).
* You know [HTML](http://en.wikipedia.org/wiki/HTML) and [CSS](http://www.w3.org/Style/CSS/).  You should be able to write both of these as these are the building blocks of any modern website.

You can learn a lot of these technologies and more at the [W3 Schools](http://www.w3schools.com/) site.

### Drupal Coding References

The following are good references for [writing Drupal code](http://drupal.org/contributors-guide) (assuming Drupal 6):

* Coding Guidelines
    * [Drupal PHP Coding Standards](http://drupal.org/coding-standards)
    * [Drupal Code Commenting Standards](http://drupal.org/node/1354)
    * [Drupal HTML Coding Standards](http://groups.drupal.org/node/6355)
    * [Drupal CSS Coding Standards](http://drupal.org/node/302199)
    * [Drupal Javascript Coding Standards](http://drupal.org/node/172169)
* Module Building
     * [Writing a Drupal Module](http://drupal.org/node/206753) (and sub-pages)
     * [Writing .info Files](http://drupal.org/node/231036)
     * [Writing .install Files](http://drupal.org/node/323314)
     * [Module Documentation](http://drupal.org/node/161085)
* Writing Good Code
     * [Writing Secure Code](http://drupal.org/writing-secure-code) (and sub-pages)
     * [Using Javascript in Drupal](http://drupal.org/node/121997) (and sub-pages)
     * Know the [Drupal API](http://api.drupal.org) and [Working with the API](http://drupal.org/node/326)
     * Know the [From API](http://api.drupal.org/api/file/developer/topics/forms_api.html)
     * Know the [Drupal Hooks](http://api.drupal.org/api/group/hooks)
     * Know the [Theme Layer](http://drupal.org/node/165706)
     * Know [t()](http://api.drupal.org/api/function/t) and [l()](http://api.drupal.org/api/function/l)
     * Use the [Coder Module](http://drupal.org/project/coder)
* Contributing to Drupal
    * [Drupal and CVS](http://drupal.org/handbook/cvs)
    * [CVS Quickstart](http://drupal.org/handbook/cvs/quickstart)

### The Development

I was given the responsibility of creating the first prototype.  I was lucky to have Patrick's module to help with the Javascript and OpenLayers side of things, but there was still a need to do things the Drupal way.  The two basic functions of the core OpenLayers module that would provide an interface for further functionality are the following:

* An associative array to hold all the data that is needed to render a map.
* A set of Javascript functions to handle the data that is passed to it.

Please note that the following code is from a version that is still in development, and at a point that we have not taken the time to fully audit our code and release the module.

#### A Basic Map Array and Sensible Defaults

A very basic map array is below.  Note the different depths as these usually mean separate processing.  

This function also points out an important topic: **Sensible Defaults**.  Sensible defaults basically mean that given no user input or customization, how will the system react.  This is important from a usability standpoint, as it means that the module works without any configuration.  Specifically for this module, it means that a map can be rendered without having to set any values.


<div>
{% highlight php %}
/**
 * Get Map Defaults
 *
 * @return
 *   map array
 */
function _openlayers_get_map_defaults() {
  $map_default = array(
    'id' => _openlayers_create_map_id(),
    'width' => 'auto',
    'height' => '300px',
    'center' => array(
      'lat' => '0',
      'lon' => '0',
      'zoom' => 2,
    ),
    'options' => array(
      'projection' => 4326,
      'displayProjection' => 4326,
    ),
    'controls' => array(
      'LayerSwitcher' => TRUE,
    ),
    'layers' => array(
      'openlayers_default_wms'
    ),
  );
  return $map_default;
}
{% endhighlight %}
</div>


#### Rendering the Map

The following if the rendering function for a map.  The input is the associative array talked about above.


<div>
{% highlight php %}
/**
 * Render Map
 *
 * Given perimeters, render an OpenLayers map
 *
 * @ingroup API
 * @param $map
 *   Associative array of map paramters
 *  
 * @return
 *   Boolean if successful
 */
function openlayers_render_map($map = array()) {
  // Check array
  if (!is_array($map)) {
    return FALSE;
  }
  
  // Intialize
  if (openlayers_intialize() == FALSE) {
    return FALSE;
  }
  
  // Check ID
  if (!$map['id']) {
    $map['id'] = _openlayers_create_map_id();
  }
  
  // Merge with site defaults (saved values)
  $saved_defaults = variable_get('openlayers_defaults', array());
  $map = openlayers_merge_maps($saved_defaults, $map);
  
  // Merge with module/system defaults
  $system_defaults = _openlayers_get_map_defaults();
  $map = openlayers_merge_maps($system_defaults, $map);
  
  // Process layers
  $map['layers'] = _openlayers_layers_process($map['layers'], $map);
  
  // Hook for one last alter
  // hook_openlayers_map_alter(&amp;$map = array())
  drupal_alter('openlayers_map', &amp;$map);

  // Check our map for errors
  _openlayers_error_check_map($map);

  // Add map container to drupal JS settings
  $openlayers = array(
    'openlayers' => array(
      'maps' => array(
        $map['id'] => $map,
      ),
    ),
  );
  drupal_add_js($openlayers, 'setting');
  
  // Add themed HTML (no need for it to go to JS)
  $map['themed'] = theme('openlayers_map', $map);
  
  return $map;
}
{% endhighlight %}
</div>


#### Hooks

The rendering process actually involves 3 different hooks (though some are within sub-functions):


<div>
{% highlight php %}
hook_openlayers_layers_info()
{% endhighlight %}
</div>


This hook gathers information on layers that are available to a map.  The main goal of this hook is to get data on how to get more detailed data.  This is important so that we are not unnecessarily processing a lot of data until the right time.


<div>
{% highlight php %}
hook_openlayers_layers_handler_info($map = array())
{% endhighlight %}
</div>


This hook gathers information on how to handle layers, specifically which Javascript function to call in order to process the layer.


<div>
{% highlight php %}
hook_openlayers_map_alter(&amp;$map = array())
{% endhighlight %}
</div>


This is an alter hook, which is a little more specific that a regular hook.  It's most prominent use is with Drupal forms.  This basically passes around the map array to any module that wants it to see if there is any final processing to do.

The OpenLayers Layers module, at the moment, is just implementation of the first two hooks.  In the future it will become an actual interface for managing layers, but will still remain implementations of these hooks.

#### Javascript Processing

The following is the very top level of the map array processing.  We are sending the map array with [drupal_add_js($array, 'setting)](http://api.drupal.org/api/function/drupal_add_js), which can be accessed with something like: <code>Drupal.settings.array.key</code>.


<div>
{% highlight javascript %}
/**
 * When document is ready for JS
 */
jQuery(document).ready(function() {
  // Store rendered maps and other OpenLayer objects in Drupal.openlayers.activeObjects
  Drupal.openlayers = {}
  Drupal.openlayers.activeObjects = [];
  Drupal.openlayers.mapDefs = Drupal.settings.openlayers.maps;
  
  // Go through array and make maps
  for (var i in Drupal.openlayers.mapDefs) {
    var map = Drupal.openlayers.mapDefs[i];
    // Check to see if there is a div on the page ready for the map. If there is then proceed.
    if ($('#' + map.id).length > 0) {
      // Make div the right dimensions and add custom controls
      $('#' + map.id).css('width', map.width).css('height', map.height);
      $('#' + map.id).after('<div class="openlayers-controls" id="openlayers-controls-' + map.id + '"></div>');
      $('#openlayers-controls-' + map.id).css("position","relative").css("bottom",map.height);
      
      // Set-up our registry of active OpenLayers javascript objects for this particular map.
      Drupal.openlayers.activeObjects[map.id] = {};
      
      // Set up places for us to store layers, controls, etc.
      Drupal.openlayers.activeObjects[map.id].controls = [];
      Drupal.openlayers.activeObjects[map.id].layers = [];
      Drupal.openlayers.activeObjects[map.id].active = false;

      // Render Map
      openlayersRenderMap(Drupal.openlayers.mapDefs[i]);
    }
  }
});

/**
 * Render OpenLayers Map
 */
function openlayersRenderMap(map) {
  // Create Projection objects
  Drupal.openlayers.activeObjects[map.id].projection = new OpenLayers.Projection("EPSG:" + map.options.projection);
  Drupal.openlayers.activeObjects[map.id].externalProjection = new OpenLayers.Projection("EPSG:" + map.options.displayProjection);
  
  // Create base map options
  var options = openlayersCreateMapOptions(map.options, map.controls, map.id);
  
  // Store map in our registry of active OpenLayers objects
  Drupal.openlayers.activeObjects[map.id].map = new OpenLayers.Map(map.id, options);
    
  // Add ID to map.
  // @@TODO: Properly namespace this.
  Drupal.openlayers.activeObjects[map.id].map.mapid = map.id;
  
  // Add events to the map 
  for (var evtype in map.events){
    for (var ev in map.events[evtype]){ 
      //@@TODO: Do this without eval. See http://drupal.org/node/172169 on why we should not use eval.
      eval("Drupal.openlayers.activeObjects[map.id].map.events.register(evtype,Drupal.openlayers.activeObjects[map.id].map," +  map.events[evtype][ev] + ");");
    }
  }
  
  //On MouseOver mark the map as "active".
  $('#' + map.id).mouseover(function(){
    Drupal.openlayers.activeObjects[$(this).attr('id')].active = true;
  }).mouseout(function(){
    Drupal.openlayers.activeObjects[$(this).attr('id')].active = false;
  });
  
  // We set up all our layers
  openlayersProcessLayers(map.layers, map.id);
  
  // Make some layers editable and set-up the editing interface.
  if (map.draw_features) {
    openlayersProcessDrawFeatures(map.draw_features, map.id);
  }
  
  // Add layers to map
  for (var l in Drupal.openlayers.activeObjects[map.id].layers) {
    var layer =  Drupal.openlayers.activeObjects[map.id].layers[l];
    Drupal.openlayers.activeObjects[map.id].map.addLayer(layer);
  }
  
  // Add controls to map
  for (var c in Drupal.openlayers.activeObjects[map.id].controls) {
    var control = Drupal.openlayers.activeObjects[map.id].controls[c];
    Drupal.openlayers.activeObjects[map.id].map.addControl(control);
    if (control.activeByDefault) control.activate();
  }
               
  // Zoom to Center
  var center = new OpenLayers.LonLat(map.center.lon, map.center.lon);
  Drupal.openlayers.activeObjects[map.id].map.setCenter(center, map.center.zoom);
}
{% endhighlight %}
</div>


#### Open Discussion and Collaboration

After too many emails, we decided to take out [discussion out in the open](http://drupal.org/node/432642) about how to develop this module.  This allows for us to have a more focused conversation and for other people to join in on the conversation.

One of the best parts of this project is collaborating with other developers around the world.  One of the major strengths of open-source is having code reviewed by many people, and this project has been a small example of that.  We are able to make the project much better by working together and discussing openly how and why we do things.  Though we may not always agree on the best way to do things, we are able to discuss openly and come to a compromise and learn from each other.
