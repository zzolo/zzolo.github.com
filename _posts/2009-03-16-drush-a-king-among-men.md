---
layout: default
title: Drush, a King Among Men
created: 1237244750
---

[Drush](http://drupal.org/project/drush "The Drupal Shell") is wonderful.  I discovered it about six to nine months ago and can't even fathom the amount of time it has saved me.  Thank you, Drush, more specifically [the wonderful developers](http://drupal.org/project/developers/97249) on the project.

### Drush Basics

If you are not in the know, and it's okay if you are not, Drush is a command line application for Drupal.  Drush by itself is more of a framework, and becomes much more powerful and useful in conjunction with [Drush Extras](http://drupal.org/project/drush_extras).  Once you have set things up, you can do something like:


<div>
{% highlight bash %}
drush pm install cck views imagecache
{% endhighlight %}
</div>


This would install (cvs checkout to sites/all/modules) the CCK, Views, and ImageCache modules.  You would still have to go to the web administration to enable the modules.  But, how easy is that!  I am starting to put put together Drush install profiles, instead of using Drupal's install profiles.  (I understand that these are two very different utilities)  For instance, I have put together this single command that will checkout all the latest versions of my usual modules for site:


<div>
{% highlight php %}
drush -l http://example.org pm install admin_menu advanced_help better_formats calendar cck date devel favicon filefield globalredirect gmap google_analytics imageapi imagecache imagecache_actions imagefield jquery_update lightbox2 link location logintoboggan markdown mollom pathauto token views seo_checklist context spaces cvs_deploy coder nodequeue wysiwyg webform xmlsitemap emfield jq jquery_media content_profile twitter flickr job_queue
{% endhighlight %}
</div>


And then, I can review and update them all via the following command.


<div>
{% highlight bash %}
drush -l http://example.org pm update
{% endhighlight %}
</div>


You still have to visit update.php and, with any contributed module, make sure it doesn't break your site.

### Recent Drush Presentation

At [DrupalCon DC](http://dc2009.drupalcon.org/) just a couple weeks back, [Moshe Weitzman](http://drupal.org/user/23) and [Owen Barton](http://drupal.org/user/19668) did the presentation: [Drush, Command Line Drupal Productivity](http://dc2009.drupalcon.org/session/drush-command-line-drupal-productivity).  [Watch the video](http://www.archive.org/details/DrupalconDc2009-DrushCommandLineDrupalProductivity)

### Simple Script to Help Setup Drush

Since the only slight problem with Drush is setting up, which has gotten much easier in the the new 2.x branch, I have created a simple shell script to help automate it.  I am not that experienced with [shell scripting](http://tldp.org/LDP/abs/html/ "Advanced Shell Scripting"), but this works in my environment and is a good place to start otherwise.


<div>
{% highlight bash %}
#BEGIN drush-install.sh
#!/bin/sh
###############################

# General variables
DRUSHPATH='/home/alanpalazzolo/.drush';
DRUSHDOWNLOAD='http://ftp.drupal.org/files/projects/drush-6.x-2.x-dev.tar.gz';
DRUSHEXTRASDOWNLOAD='http://ftp.drupal.org/files/projects/drush_extras-6.x-2.0-alpha1.tar.gz';
ALIASFILE='/home/alanpalazzolo/.bash_profile';
DRUSHALIAS='drush';

# Check directory
if \[ -d $DRUSHPATH \]; then
  echo "Drush directory exists.";
else
  echo "Creating drush directory.";
  mkdir $DRUSHPATH;
fi

# Go to drush dir
echo "Going to drush directory.";
cd $DRUSHPATH;

# Get drush
echo "Download and untar drush.";
wget $DRUSHDOWNLOAD;
tar -zxvf drush-*;

# Get drush_extras
echo "Download and untar drush_extras.";
wget $DRUSHEXTRASDOWNLOAD;
tar -zxvf drush_extras-*;

# Make a handy alias
echo "Make alias in: $ALIASFILE";
echo "# Drush alias auto added" >> $ALIASFILE;
echo "alias $DRUSHALIAS='php $DRUSHPATH/drush/drush.php'" >> $ALIASFILE;
echo "You may have to restart your shell session for the alias to take effect.";
{% endhighlight %}
</div>
