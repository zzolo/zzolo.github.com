---
layout: post
title: Making a Drupal Module Fully Translatable
created: 1275512451
---

_Drupal 6.  Please note that most of this is sound advice but that some of it is still being debated as far as what is best practice, specifically how to ensure that exportable structures are translatable.  I encourage you to leave and read the comments._

### The Tools ###

#### Drupal's Core Function: **<code>t()</code>** ####

If you have written a module, you should be familiar with [t()](http://api.drupal.org/api/function/t).  Almost every interace string you write in your module should be wrapped with **<code>t()</code>**.  This function creates a mechanism so that the core module, locale, can offer translations for non-English languages.  Without using the **<code>t()</code>** function, Drupal would have no idea what strings are translatable and this would be very limiting for sites that were not in English (or not just in English).

The limiting nature of **<code>t()</code>** is that there is no identification on strings.  This means that Drupal is not really keeping track of changes in a string and there is no way to remove old strings that are no longer needed on the site.  This is a bad thing for user-defined strings, strings that are entered into the interface, for example the title of a menu item, since it can change often.

#### The i18n Module ####

The [i18n module](http://drupal.org/project/i18n) (i18n is used based on the number of characters in the word internationalization), offers a set of modules to make Drupal a much better platform for multilingual sites.  It offers the ability to translate some of the main structures of Drupal, like menus, taxonomies, blocks, and variables, as well as a more usable interface for translating.

The i18n module also offers a mechanism for translating strings that are based on identifiers for strings.  The **<code>i18nstrings($name, $string, $langcode = NULL)</code>** function allows for better management of user-defined strings.

### The Problems ###

#### Translatable Strings in Code ####

Though this problem is solved in core, it is still valid to point out in all of this.  Interface strings (and other messages) that are defined in code, need to be translatable.

#### User-Defined Strings ###

Interface strings and messages that are inputted by the user need to be able to be translated.  These almost always live in the database.  The main issue here is that there needs to be a mechanism to identify each inputted string so that changes can be maintained properly.

#### Denoting Translatability ####

With modules that utilize a flexible plugin architecture or other dynamic system, one big issue is how to track what fields (or other data points) need to be translatable.  This is very important to ensure that making something translatable is not hard-coded.

#### Exported Data ####

Recently (well, Views has done this well for a while), there has been a lot of work towards making Drupal structures that have the ability to be imported and exported.  The main benefit of this is that it allows for setting-type structures to live in and be maintained in code.  In turn, this means that a data structure that may contain interface strings and messages can be stored in either code or in the database.

### The Solutions ###

#### The **<code>t()</code>** Function ####

The Drupal core **<code>t()</code>** function handles the ability to translate static strings within module code.  For instance:


<div>
{% highlight php %}
  '#description' => t('This is an example for the t() function.'),
{% endhighlight %}
</div>


#### i18n Module ####

The i18n module provides the **<code>i18nstrings()</code>** function to allow a module to translate its user-defined strings (see below about Drupal variables).  Please see [Translating user defined strings for module developers](http://drupal.org/node/789286) for more information and example code.  Do keep in mind that you will want to create a wrapper function, unless you want your module to depend on the i18n module.  For example:


<div>
{% highlight php %}
function yourmodule_translate($name, $string, $langcode = NULL, $textgroup = 'yourmodule') {
  // Check for existence of i18nstrings function, then
  // translate if available.
  return function_exists('i18nstrings') ? 
    i18nstrings($textgroup . ':' . $name, $string, $langcode) : 
    $string;  
}
{% endhighlight %}
</div>


The i18n module also provides a way to more easily translate variables that your module may store.  The mechanism that tells the i18n about your variables is a variable itself, <code>$conf\['i18n_variables'\]</code>, usually set in the settings.php file.  Your module can circumvent this, by utilizing **<code>hook_init()</code>**.  For example:


<div>
{% highlight php %}
function yourmodule_init() {
  // Get i18n variable array.
  global $conf;
  
  // Add your module's translatable variables
  $conf['i18n_variables'][] = 'yourmodule_variable_1';
  $conf['i18n_variables'][] = 'yourmodule_variable_2';
}
{% endhighlight %}
</div>


#### Schema or Plugin Notation ####

For Views 3, there is a [discussion](http://drupal.org/node/357529) on putting in a plugin system for translators.  This is pretty awesome, though may be overkill for most modules.  But more specifically this issue also deals with how to denote things as translatable so that they can be automatically ran through the given translation system.

The best solution here is hard to define.  It is very dependent on architecture.  If you are using a database table for specific data structures (like with [CTools](http://drupal.org/project/ctools)), it would probably be best to simply provide a <code>'translatable' => TRUE</code> field to the schema that can be referenced when displaying values.  For example:


<div>
{% highlight php %}
       'description' => array(
         'type' => 'text',
         'not null' => TRUE,
         'description' => 'Layer description.',
         'translatable' => TRUE,
       ),
{% endhighlight %}
</div>


But this still poses some questions like: How to handle serialized data?  Handling customized forms?

#### Managing **<code>t()</code>** in Exports ####

This is the area that seems to most questionable in my mind.  Most of these ideas and the proposed solution is taken from a [discussion](http://drupal.org/node/750810) for the OpenLayers module.

The problem with exports is that they are exported as code and can be used either as code or imported back into the system via the interface.  At least this is the common use of exportable structures.  So, we need a way that ensures that structures in code are translatable and structures in the database are translatable, but without overlapping the two.

My proposed solution is then this:

* Provide export with the **<code>t()</code>** embedded into it; this will be determined by the mark of translatability.  This ensures that structures that live as code are translatable.
* On import, strip out the **<code>t()</code>**.
* Finally, on display, check where the structure lives, and if in database, then translate (taking into account everything above).

You might say that: Why not just translate on display?  The problem here, as I see it, is that there are probably already structures living code that have not been exported, like default Views or OpenLayers layers, and taking these out of the usual Drupal t() paradigm is dangerous.  Also, this means that structures are translatable without a third-party module.

### In Conclusion ###

I hope this makes everyone think about ensuring that their modules are fully translatable because the world is full of non-English internet users.

I'll also be the first to admit that I am not doing this will all my modules.  It took me a long time to research most of this information.  I think it is important to start to work towards making these methods standardized and more obvious to module developers.

It's also important to look towards what is happening in Drupal 7 and how this might influence these structures.  Honestly, I am in the dark as far as what changes are happening in D7 as far as localization goes.
