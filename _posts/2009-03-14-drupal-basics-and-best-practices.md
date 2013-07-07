---
layout: default
title: Drupal Basics and Best Practices
created: 1237080221
---

I recently compiled a simple document for a client that outlines best practices for Drupal that are not obvious at first.  This is aimed at someone who has already installed Drupal, installed modules, added content, and has a basic understanding of where things are.

I'd also like to point out that finding pages on the internet to describe some basic things in Drupal seem to be lacking.  There plenty of bits and pieces, but I had some trouble finding explanations that I thought would be really easy to find.  I guess I need to write more.

### Drupal  Best Practices ###

#### Modules ####

* Choosing Modules
   * There are 1000's of [module](http://drupal.org/project/Modules "Drupal module") out there for Drupal.  It's hard to know which one is right for you, so be deliberate about which ones you install.
   * You do not want too many modules installed.  It will slow down your site.  (see Module Maintenance below)
   * Look at the releases.  The more often and more recent, the better.  If you choose something that is not or will not be maintained, you will run into trouble down the line.
   * Check the Issue Queue for that module.  Do the maintainer(s) answer questions in a timely manner?
   * There is a new statistics section with each module which describes how often things are downloaded.  It is not the most perfect metric, but will help. 

* Module Downloading and Upgrading
   * This is a common problem with Drupal.  It is kind of difficult and time-consuming to install and upgrade modules.  The usual way is to download the tarball (.tar.gz) file.  Un-archive it on your computer, then FTP it up to the server.
   * There is no good way to do this through the web interface.  This is an inherent security flaw because your web server should not have access to write to your modules directory.  (though this is not usually the practice)
   * If you are comfortable with command line, I would suggest [checking modules out through CVS](http://drupal.org/node/321 "Checking out from the contribution repository").  Just as recently as last week, the [CVS Instructions tab](http://fourkitchens.com/blog/2009/03/12/cvs-instructions-tab-now-available-all-drupalorg-projects) was added to each module page, making this a lot easier.  This is done on the server.  Install the [CVS Deploy module](http://drupal.org/project/cvs_deploy) as well, so that you can easily see the version of modules you are using.
   * If you want to get a little fancy, but want to save a lot of time in the long run, you can look into the [Drush module](http://drupal.org/project/drush "Drush!").  It requires some initial setup, but creates a really easy way to manage modules via the command line.
   * Otherwise, you are kind of stuck downloading the tarballs.
   * **Always run update.php** after upgrading any module and Drupal itself.
   * A side note, [checking Drupal itself out via CVS](http://drupal.org/node/320) is a good idea as it makes upgrading easier.

* Module Installing and Uninstalling
   * Always read the README file that should come with each module.
   * Enabling and Disabling modules simply means that Drupal will not load the file when running.
   * Install and Uninstalling means that Drupal will set up data structures and destroy data respectively.
   * Disable any modules you are not using.
   * Be sure to uninstall modules you once installed and are not using (and do not want the data from).  You can uninstall modules at _admin/build/modules/uninstall_.

* Module Directory Structure
   * All modules should be in either of the following directories (unless you are running a [multi-site](http://drupal.org/node/43816 "Drupal multi-site instructions")):
       * _sites/all/modules_
       * _sites/default/modules_
   * Same with themes, except in themes folder
       * _sites/all/themes_
       * _sites/default/themes_

#### Security ####

* Files
   * Only your files directory should be writable by the webserver.  Either of the two folders should be your files directory:
        * _sites/default/files_
        * _files_
* Install the [LoginToboggan module](http://drupal.org/project/logintoboggan).  It adds some simple features, one important one is enforcing password length. 
* Drupal One User
   * The first user created in Drupal has all access to the site.
   * You should only use this user to run update.php.
   * You should set up a "developer" role and give it full access explicitly.  Then create an account that is in this role.  This adds a layer of security because you are not using the Drupal One account often.
* Drupal Users
   * Only use a single login page, not the block.  Passwords are not encrypted unless you are using a SSL certificate (this has nothing to do with Drupal specifically).  By only having one entry point, you limit the ability for your passwords to be read.  If you are really concerned about passwords, you should get an SSL certificate.
* Drupal Permissions
    * Log in as different users to ensure that only have access to the parts of the site that you expect them to.
    * Be careful about who you give full access to.  Take the time to create new users for people and new roles if necessary.
    * [CCK](http://drupal.org/project/cck) has field level permissions which can be very helpful, but a lot to maintain.
* Join the Security Announcements on Drupal.org.  Sign up for an account, then edit your account and you will find it.  http://drupal.org/user/USERID-HERE/edit/newsletter
    * There has been some recent trouble with the subscriptions, but you can always go to http://drupal.org/security to find out these things.
* [CAPTCHA](http://en.wikipedia.org/wiki/Captcha). There are two suggestions if you are going to have anonymous users enter data (including registering for an account):
   * [Mollom module](http://drupal.org/project/mollom).  This is a service.  It is nice because it does not display the CAPTCHA form unless the submitted data is suspected to be bad.
   * [CAPTCHA](http://drupal.org/project/captcha) and [reCAPTCHA](http://drupal.org/project/recaptcha).  You can just install the CAPTCHA modules and have simple blocks for spam, but reCAPTCHA is a well done service to help block spam.

#### Performance ####

* When you are not developing or doing heavy configuration in Drupal, turn off (disable) modules that are not needed.  The [Admin Menu](http://drupal.org/project/admin_menu) module has a button to help with this, as well as being a great tool for administrators.
    * [Views UI](http://drupal.org/project/views)
    * [Imagecache UI](http://drupal.org/project/imagecache)
    * [Devel](http://drupal.org/project/devel)
    * [SEO Checklist](http://drupal.org/project/seo_checklist)
* Also when you are not developing or doing heavy configuration in Drupal, go to the performance page (admin/settings/performance):
    * Turn simple caching on
    * Turn Block caching on
    * Optimize CSS
    * Optimize JS (I have known this to be buggy, but it is worth trying)
* Make sure that [cron](http://drupal.org/cron) is running!

### Specific Modules ###

#### CCK and Views ####

These are almost always necessary.  They are very important.

* [CCK](http://drupal.org/project/cck) adds the ability add arbitrary fields to nodes, making content much more robust.
* [Views](http://drupal.org/project/views) allows you to create all different kinds of ways to see the data of your site.

#### Events ####

You should not use the Events module.  It is suggested to use the [Date module](http://drupal.org/project/date), then use different [Views](http://drupal.org/project/views) and Views-related modules, like [Calendar](http://drupal.org/project/calendar), to display that data.  Events are really just nodes with date information, and Date module handles this better, and you can do more with it because it is a [CCK](http://drupal.org/project/cck) field.

#### Development ####

Even if you are not doing development, the [Devel module](http://drupal.org/project/devel) has some nice features.  Make sure to turn it off when you are not using it.

#### WYSIWYG ####

This topic is still in conversation around Drupal.  But the way of the future is using the [WYSIWYG API module](http://drupal.org/project/wysiwyg), then using a third party editor on top of that.  This helps standardize how editing works.

If you can get away without a WYSIWYG editor, you should do that.  Without a fair amount of work, WYSIWYG editors almost always create invalid HTML markup or just create bad looking HTML.

#### Images ####

This is a tough one and really depends on your needs.

* For Images that are not within the main textarea (body), you want to create a [CCK](http://drupal.org/project/cck) solution.  A CCK solution is usually preferred.  It is more user friendly and standardizes how things look on your site.  This involves all of these modules and their dependencies:
   * [Filefield](http://drupal.org/project/filefield)
   * [Imagefield](http://drupal.org/project/imagefield)
   * [ImageCache](http://drupal.org/project/imagecache) (and [ImageCache Actions](http://drupal.org/project/imagecache_actions) if you want some fancy stuff)
   * [Lightbox 2](http://drupal.org/project/lightbox2) (for some fancy effects)

* If you need to be able for users to put in images directly into textareas, try the [IMCE module](http://drupal.org/project/imce).  You will need to check with what WYSIWYG editor you chose to ensure that it works.

#### Mapping ####

For mapping of points, specifically addresses, you should use [Location](http://drupal.org/project/location) and [Gmap](http://drupal.org/project/gmap) modules.

#### SEO ####

* [Global Redirect module](http://drupal.org/project/globalredirect)
* [Favicon module](http://drupal.org/project/favicon)
* [SEO Checklist module](http://drupal.org/project/seo_checklist).  This module does not change how your site work, but simple lists the numerous things you can do to help SEO on your site.  Do not take as final word, but as more of a suggestion (you do not need to get 100%).  Also, if you are done with it, disable this module.
* [Pathauto module](http://drupal.org/project/pathauto)

#### Input Formats ####

Input formats are how user input gets filtered.  If you are using a WYSIWYG, things change a little and you will have to be a little more forgiving on what you allow through.

* [Better Formats](http://drupal.org/project/better_formats) module allows you to specify meaningful input format defaults per roles.
* [HTMLawed](http://drupal.org/project/htmLawed) will clean up the HTML which is good because valid HTML is important for many things.

### General Drupal Help ###

There are [many avenues of support and help with Drupal](http://drupal.org/support).  Drupal has a huge and thriving community that is usually very willing to help.  http://drupal.org/support

* [IRC](http://drupal.org/irc): #drupal-support channel on irc.freenode.net
* [Forums](http://drupal.org/forum)
* [Documentation](http://drupal.org/handbooks)
    * This is going through some major restructuring, as it is often to find what you need.  But there is still some good information in there.
* [Books](http://drupal.org/books)
   * I think the best book for the audience of this article is [Using Drupal](http://www.usingdrupal.com/)
* Drupal Dojo: http://drupaldojo.com/
    * Lots of good videos on lots of topics from beginners to advanced.

### What Do You Think ###

I'd love to have feedback and be able to make this document grow.
