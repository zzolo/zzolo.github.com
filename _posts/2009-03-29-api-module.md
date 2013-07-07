---
layout: post
title: API Module
created: 1238383508
---

This past week, [drupal.org](http://drupal.org) experienced some down time; which is normal.  The infrastructure team does an amazing job keeping things going as smoothly as possible, given the immensely growing community of Drupal.

### API Module

But, of course, I needed to reference some functions and hooks at [api.drupal.org](http://api.drupal.org), the community's resource for code documentation.  Fortunately, there are a few places to go that have implemented the fantastic [API module](http://drupal.org/project/api) to help supplement [api.drupal.org](http://api.drupal.org) or help document their own modules.

* [api.freestylesystems.co.uk](http://api.freestylesystems.co.uk/)
* [api-drupal.pajunas.com](http://api-drupal.pajunas.com/)
* [drupalecommerce.org/api](http://drupalecommerce.org/api)

This API module basically scans a directory recursively and reads the [Drupal Doxygen](http://drupal.org/node/1354) documentation that is available and creates an easy-to-use interface to browse it all.

### Inline Documentation

The API module would not be possible without in-depth, inline documentation in the Drupal code base.  (We won't get into the importance of non-inline documentation.)  As a programmer, I love some documentation, but I also understand how much of an after thought it usually is for most of.  So, even if you think no one will read your code, think again; there's a good chance it will make it's way onto someone else's screen.  And if you contribute modules, a good module has good documentation within the code.

### What Can I Do?

Well, you should always [document your code correctly](http://drupal.org/node/1354).  But, you can also set up an API site locally and for those other folks on the interwebs.

The first step was to install the [API module](http://drupal.org/project/api) locally so that if the Internet was not even a possibility, then I could still have an easy interface to reference the Drupal code base.

The second step was to create a public site, in my case [api.zzolo.org](http://api.zzolo.org), to help others have this information when needed.   I also put a copy of HEAD up there, started to make a section for contributed modules for Drupal 6, and installed the almost-perfect-for-api-sites-theme, [Pixture](http://drupal.org/project/pixture).  [Freestyle Systems](http://api.freestylesystems.co.uk/) did a nice job of setting up an API site with contributed module references, and is a good example.  I attempted to mimic their ability to browse contributed modules; but mine is not as great as theirs.

### How You Can do the Same

<div class="messages success">
I have added even better documentation here: http://drupal.org/node/425940
</div>

There is currently [documentation here](http://drupal.org/node/26669) that provides instructions on how to set up the API module, but it is a little out of date.  Still, its a good point in the right direction.  The following instructions are for the 6.x-1.1 release of the API module, and the example is for getting Drupal 6 documentation runnning.

1. **Install** the [API module](http://drupal.org/project/api) and [Job Queue module](http://drupal.org/project/job_queue)
1. Get the **developers documentation** via CVS.  Use the CVS command (see below) at the root of your Drupal install to get the Drupal 6 docs.  
1. Go to API module settings page at ***admin/settings/api/branches/new*** to create a new Branch
1. Then fill in the following:
    * *URL Label*: **drupal-6**
         * this is the string that will denote the branch in the URL path
    * *Page Label*: **Drupal 6** 
         * this is the string that will be the title of the branch
    * *Directories*: **/path/to/drupal-6**
         * this is a list of paths to read documentation from
1. Go to the Refresh Index page at **admin/settings/api/refresh** and hit *Reindex*.
1. Indexing will take place through cron, and specifically through the job queue.  This could take some time.  It may be beneficial to set up cron to run frequently.
    * Run cron: **admin/reports/status/run-cron**
   * Job queues: **admin/reports/job_queue**
1. Further options:
    * The API page will show up at **api**.  
    * There are also blocks to enable at **admin/build/blocks**
    * Index PHP functions at **admin/settings/api/php**
   * Create other Branches with other Drupal Versions

#### Code


<div>
{% highlight bash %}
cvs -z6 -d:pserver:anonymous:anonymous@cvs.drupal.org:/cvs/drupal-contrib checkout -r DRUPAL-6--1 contributions/docs/developer
{% endhighlight %}
</div>
