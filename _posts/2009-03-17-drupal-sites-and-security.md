---
layout: default
title: Drupal Sites and Security
created: 1237324610
---
I write this article in the spirit of open source, and with the goal of being critical of myself and the Drupal community and improving security on this great internet.  I also have the highest respect for the companies and people that have worked on these sites.

So, along the way of my many Drupal related readings, I often find myself going to the [CHANGELOG.txt](http://cvs.drupal.org/viewvc.py/drupal/drupal/CHANGELOG.txt?view=co "Recent version of CHANGELOG.txt") of sites to see if they are made with Drupal and which version they are at.  CHANGELOG.txt is the standard way of Drupal communicating what has changed in each release, and is a pretty good indicator of whether a site is running Drupal and what version it is on.  There are a few ways to determine [if a site is Drupal](http://www.lullabot.com/articles/is-site-running-drupal).

### Up to Date

I have noticed along the way that there are a number of Drupal shops and sites that are not up to date.  And I will be the first to admit that I do not keep up with all my sites.  I even had to upgrade this site while writing this article to not feel like a total ass.  Also, there are plenty of site that seem up to date as well.

So, at first I just wanted to play devils advocate and start pointing it out for fun, but started to think critically about why this happens.  And well, there are many reasons as to why sites are not up to date on their Drupal core version (let alone contributed modules). 

### What Does This Mean?

So, that's the thing: there are many reasons why we don't upgrade our sites.  Sometimes it's laziness.  Sometimes it's being too busy.  Sometimes it's the client's job.  Sometimes it's just ignorance.

But we have a problem.  We have all these amazing Drupal sites, but so many of them are not up to date.  We even have some great tools, like:

* [Acquia](http://acquia.com/products-services/acquia-network)
* [Drush](http://drupal.org/project/drush)
* [Status Update](http://drupal.org/project/update_status)

Even with some amazing tools, short of having Drupal update itself, we still have some cultural barriers.  It just seems that these things are not valued like they should be.  We love security, but in practice, security often gets overlooked.  I'll be the first to admit, that sometimes I take the easier way out.  I also think, that this cultural issue is more than just the Drupal community.  We all know the value of testing, documentation, commenting, security, planning, etc, but as programmers that don't work at IBM or Microsoft, we often slide by these things and hope people don't notice.  I may be getting a little over my head here, but my point is that we can do better (on top of the amazing things we have achieved).

### Solutions

I don't have that many possible good solutions, but I get angry with people that just criticize.  So here, is a short list:

* Some sort of automatic way to update Drupal (I have not actually used Acquia services which may include this).
* Better notifications.  Update status has some emailing option, but why not make it default to email the administrator.
* Easier to upgrade Drupal.  I am not sure the best way to do this.
* Pointing fingers.  The list below is to point things out.  If actions are taken from it, I hope sites are updated, not the mass hiding of CHANGELOG.txt.
* Support.  I am not a huge fan of supporting my clients after a project, but we all know that few clients are going to upgrade their own Drupal site.

### Changelog Reader

I felt kind of lazy (and yet not lazy at the same time), so instead of visiting a bunch of sites, I created a module to collect URL's for me and find out what version they are at.  It is called [Changelog Reader](http://drupal.org/project/changelogreader).  It is a really pointless module, and has little application besides this article, but I figured I would share.  The table below is generated from the module.  And don't worry, it is not scraping a bunch of sites each time this page is loaded.

### Versions of Drupal Shops and Big Drupal Sites

I have collected a list of Drupal shops and larger Drupal sites from the following links:

* http://www.tmgstudio.com/notable-drupal-powered-websites
* http://dc2009.drupalcon.org/sponsors

There are a number of reasons why a version does not show.  All the sites have been attempted to be read.  The table should be in the right sidebar.  Also note that this list is updated daily, hopefully revealing one day that this article is irrelevant.
