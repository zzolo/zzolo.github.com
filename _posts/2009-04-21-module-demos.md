---
layout: post
title: Module Demos
created: 1240353400
---

In the [Drupal project](http://drupal.org/project) page form there is a **Project Resources** section which includes the ability to add links to, you guessed it, project resources, things like *Homepage*, *Documentation*, *Screenshots*, and a **Demo Site**.

I only have a few modules that I have contributed to Drupal, and even the ones that I have contributed do not get much foot traffic.  Still, I strive to be a good module contributor and maintainer, by doing things like writing good documenting in and outside the code.  I also like to have links for all the **Project Resources**.  This is not always possible.  Often people (myself included) just link the *Documentation* to the current README.txt file in the <acronym title="Concurrent Versions System">CVS</acronym> repository.  I have started just linking the *Changelog* category to the <acronym title="Concurrent Versions System">CVS</acronym> messages for the module.

I have always wanted to be able to have an actual place to demo my modules without linking to this specific site.  But I never wanted to spend the time both initially and ongoing to create a demo site for each module.  It's a fair amount of work, and there is always the issue of security, and concerns of users creating offensive content.  So, I never did... until now!

### The Value of Demonstration

So, why should I even bother creating a demo site when someone can just download the module and try it out?  Well, here a few of the many reasons why a demo site is a great idea for modules:

* Some beginners don't know how to easily setup a Drupal site, let along install modules.
* Some people just want to see if Drupal is for them, and their needs might include this module.
* Even having installed many instances of Drupal, it's still annoying to have to do this just to test out a module.
* There are so many modules out there, and probably a similar module, and this module's great documentation might not accurately describe the differences.
* Documentation is great, but demonstration will provide a lot more understanding for most users.

### The Demo Module

The [Demo Module](http://drupal.org/project/demo) has been around for quite some time. It's a fairly straightforward module that allows you to taken a snapshot of your site and reset it back to that point.  A snapshot is basically a database dump.  So, a site can reset itself as often as you want.

### My New Sandbox

So, I put it all together in a few hours and created the [Zzolo Sandbox](http://sandbox.zzolo.org).  It resets every hour.  It's main goal is demo my modules (I still have some more to add).

It's simple:

* Install Drupal as usual.
* Install the Demo module.
* Setup site like you like it.  I created a content type that describes each "demo", which are my modules.
* Set permissions as you like.  I made it so that the anonymous account can do everything in the demo.
* Set your snapshot, an interval to reset, and cron.

### Things to Consider and Ways to Learn

My modules are pretty simple.  Once you get into more levels of depth, you may have to consider how you want visitors to interact with your demo, but since it resets itself, there is not too much to worry about.

In this process, I had to think about how my modules would react in this environment.  Most importantly, I had to consider my module's permissions and cron.  But there are many things to learn from this environment for a module, including the following:

* Permissions
* Cron
* Security

### A Little Extra

One thing that was bugging me when I was setting this up was that the user had little idea to when the site was going to reset (or that it was a demo site), meaning that they could be in the middle of something and have the site change drastically.  So I made a simple block with a timer on it.

This is using the [jCountr](http://plugins.jquery.com/project/jCountr) plugin to create a countdown to the next reset.  I had set up the demo to reset every hour and cron to run every 43 minutes on the hour and this is hard-coded here.  **This is not necessarily well-written Drupal code**, but it is secure and does the job.  Here is the Drupal block hook:


<div>
{% highlight php %}
/**
 * Implementation of hook_block().
 */
function demo_timer_block($op = 'list', $delta = 0, $edit = array()) {
  switch ($op) {
    case 'list':
      $blocks[0] = array(
        'info' => t('Demo timer'),
        'cache' => BLOCK_NO_CACHE,
      );
      return $blocks;
    
    case 'view':
      $minute = (int) date('i');
      $seconds = (int) date('s');
      if ($minute >= 43) {
        $minutes_left = (60 - $minute) + 43;
      }
      else {
        $minutes_left = 43 - $minute;
      }
      $data = array(
        'demo_timer' => array(
          'minutes_left' => $minutes_left,
          'seconds_left' => (60 - $seconds),
        ),
      );
      drupal_add_js(drupal_get_path('module', 'demo_timer') .'/jquery.jCountr.1.1.js');
      drupal_add_js(drupal_get_path('module', 'demo_timer') .'/demo_timer.js');
      drupal_add_css(drupal_get_path('module', 'demo_timer') .'/demo_timer.css');
      drupal_add_js($data, 'setting');
      $block = array(
        'subject' => t('Demo Timer'),
        'content' => '
          '. t('This site is a demo and will reset itself 43 minutes on the hour.') .'
          <div id="demo-timer"></div>
        ',
      );
      return $block;
  }
}
{% endhighlight %}
</div>


Here is the Javascript:


<div>
{% highlight javascript %}
$(document).ready(function() {
  $("#demo-timer").counter({
    min: Drupal.settings.demo_timer.minutes_left,
    sec: Drupal.settings.demo_timer.seconds_left,
    message: 'RESETTING'
  });
});
{% endhighlight %}
</div>
