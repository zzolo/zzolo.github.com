---
layout: default
title: Upgrade Love with Demo and Drush
created: 1266192061
---

My Valentines Day consisted of coding the beginnings of the upgrade path from 1.x to 2.x of the [OpenLayers](http://drupal.org/project/openlayers) module; that's some true love for the OpenLayers 1.x users.  

The OpenLayers has a fairly unique situation where we have 3 major versions for Drupal 6, but they are not sequential, and going form OpenLayers 1.x to 2.x is a fairly large change.  We have just released [1.0-RC1](http://drupal.org/node/709818) and [2.0-alpha1](http://drupal.org/node/708270), so it was about time to [create an upgrade path](http://drupal.org/node/710610) for those folks on 1.x.  Though it still needs some serious work, it's getting there.  But, the point is, I ran into this problem: testing a Drupal update function with major schema changes without help can be tedious.

### The Problem ###

Basically, a Drupal update is a specific function that gets called from update.php (or equivalent Drush command) given that the state of the module's schema is less than the newest available one.  This means I have to do the following to test:

1. Set up site with test data.
1. Code update.
1. Run update.php.
1. Make sure everything went as planned.
1. Repeat as needed (even if you have a syntax error).

Imagine doing this over and over again for a very involved upgrade process!  I knew right away that this was not for me.

### The Solution ###

(Note, there may be some much better way to do this with the [Drupal SimpleTest module](http://drupal.org/project/simpletest) but I am unaware of it)

It was pretty obvious that a database dumb was going to be the best way to go; I could set up the site and then restore when I needed to test.  But exporting, importing, managing changes, and just laziness kept me trying to think of something better.  Then the [Demo](http://drupal.org/project/demo) module popped into mind!  The Demo module basically takes a snapshot of your database and allows you to restore to it, either through the interface or on cron runs.  This seemed like a good candidate to getting around installing a new site and setting it up or using database dumps.

So, first step is to setup your Drupal site as you want it before the upgrade process.  Then use the Demo module to make a snapshot.  Also, it is important to install the Demo Reset module (part of Demo package) and set a default snapshot to use as we will refer to this when resetting.  And! if your process changes, Demo makes it really easy to make changes to your site and save another snapshot.

Next, we just need to write a simple little script to do the restore and update (keep in mind we are going for lazy and automated).  Luckily [Drush](http://drupal.org/project/drush) is wonderful and allows us an easy way to run some simple PHP after Drupal has bootstrapped itself, and then perform the update.  Here is my basic script, which is really just two commands.


<div>
{% highlight bash %}
#!/bin/bash

# Since I was using this on my local machine, I needed to set
# where my Drush was coming from and could ensure I can run
# from anywhere
DRUSH_CMD='/bin/php5/bin/php /home/zzolo/.drush/drush/drush.php -r /path/to/your/site';

# Reset site with some PHP.  This command resets the site
# with the default snapshot.
$DRUSH_CMD php-eval "demo_reset(variable_get('demo_dump_cron', 'demo_site'), FALSE);"

# Run update.  This runs the update.php which should now be needed.  The -y
# answers all questions with yes
$DRUSH_CMD -y updb
{% endhighlight %}
</div>


So, now the new workflow is the following, and it's easy to ensure upgrades are working well.

1. Code changes.
1. Run script
1. Repeat.
