---
layout: default
title: Applying for a Drupal CVS Account?
created: 1269858129
---

I have recently discovered the great joy of [reviewing CVS applications for Drupal](http://drupal.org/project/issues/cvsapplications?categories=All).  I am serious, I love looking at code and directing Drupal developers early on into using Drupal Coding standards and best practices for Drupal development.  I have also noticed a number of similar things, so I would like to write a quick post about some basics as to creating a Drupal module that can get a CVS account.

Please note that, these are not necessarily a part of the [CVS Application Requirements](http://drupal.org/cvs-application/requirements), and I do NOT speak for the Drupal Infrastructure team or other reviewers of applications.  This is just things that I notice and suggest when I do my review, and I feel are important when creating and contributing a Drupal module or theme, a lot of which can already be found on the often-overlooked [things to expect](http://drupal.org/node/539608) (and I should add to as well).  Also, I am quite aware that my code is not perfect, but that does not mean I am not capable of directing people in the right direction.

It may be good for perspective to tell you that, honestly, I don't even install the module that I am reviewing most of the time; I just look at the code.  I make the assumption that if you are sharing it, you have already used it and tested before applying with it.  In some people's eyes, this may seem irresponsible, but I feel it is a safe assumption to make.

### Requirements and Other Modules ###

As the number of contributed modules continually grows on [drupal.org](http://druapl.org), it is more and more important to ensure that new contributors have proved that they have looked at other modules and can describe what their modules do accurately.

* Make sure you read the [CVS Application Requirements](http://drupal.org/cvs-application/requirements)!
* A lot of this same information is in the [what to expect article](http://drupal.org/node/539608) but is often overlooked.
* Describe how you looked for other modules and ANY module that may do similar things.  I need to know you at least looked.
* Are you leveraging other modules in yours?  There are a number of stable API modules in Drupal.  If applicable, you should use them, or tell me why you are not.
* Is your module a feature that should be a part of another module?
* Tell me that you have read these pages and link to them.
* This is all volunteer work, if you follow this stuff up front, you will save everyone time and make me much happier.

### Coding Standards ###

* Follow the [Drupal Coding Standards](http://drupal.org/coding-standards).
* Note that the Drupal Coding Standards include [Javascript](http://drupal.org/node/172169) and [CSS](http://drupal.org/node/302199) files (among others).
* Use 2 spaces, not tabs.
* See [String Concatenations](http://drupal.org/coding-standards#concat).
* Every text file that you put into the Drupal CVS repository should have the following at the top of the file: **$Id$**  In code files, this will be within a comment.  This automatically gets changed by the CVS packaging system to something like to include, the date, your name, etc.
* All code files need to have a [@file docblock](http://drupal.org/node/1354#files).
* All functions should have a [docblock](http://drupal.org/node/1354#functions).
* Documenting hook implementations only need to reference the hook:
   
<div>
{% highlight php %}
/**
 * Implements hook_help().
 */
function blog_help($section) {
  // ...
}
{% endhighlight %}
</div>

* Run your module through [Coder](http://drupal.org/project/coder) to help automate some of this.  Note that you can change the options when running your module through Coder.

### Drupal Module Basics ###

Some basic coding patterns in [creating a Drupal module](http://drupal.org/node/231276).

* Look at Drupal core module files!  These are the best examples of well-written code, hence why they are in core.
* In the [.info file](http://drupal.org/node/231036), do NOT include the following, as they are added by the CVS packaging system.
   * version
   * project
* [.install files](http://drupal.org/node/323314) contain the following hook implementations if they are needed (and should not be in your .module file):
   * [hook_install()](http://api.drupal.org/api/function/hook_install)
   * [hook_uninstall()](http://api.drupal.org/api/function/hook_uninstall)
   * [hook_enable()](http://api.drupal.org/api/function/hook_enable)
   * [hook_disable()](http://api.drupal.org/api/function/hook_disable)
   * [hook_schema()](http://api.drupal.org/api/function/hook_schema)
* Any significant HTML output needs to be run through the [theme layer](http://drupal.org/node/165706).

### Using the Drupal API ###

It is important to leverage the [Drupal API](http://api.drupal.org) as much as possible (and to work towards changing it if you don't like it).

* Use these functions correctly when needed.  You will definitely use t() in your module, and at least one, if not all, of these API functions.
   * [t()](http://api.drupal.org/api/function/t)
   * [l()](http://api.drupal.org/api/function/l)
   * [url()](http://api.drupal.org/api/function/url)
   * [watchdog()](http://api.drupal.org/api/function/watchdog)
   * [drupal_set_message()](http://api.drupal.org/api/function/drupal_set_message)
* The basic design pattern of input in Drupal, is filter output, not input.  This means that do not alter input, but make sure that you filter any output to the screen that is user supplied.  Know these functions and when to use them:
   * [check_plain()](http://api.drupal.org/api/function/check_plain)
   * [check_markup()](http://api.drupal.org/api/function/check_markup)
   * [filter_xss_admin()](http://api.drupal.org/api/function/filter_xss_admin)
* Drupal has custom implementation of common PHP string functions to help support Unicode; see the functions in [unicode.inc](http://api.drupal.org/api/drupal/includes--unicode.inc/6).
* Read [writing secure code](http://drupal.org/writing-secure-code) and all its child pages!  Seriously!

### Third-Party Resources and Licensing ###

The general policy is not to allow third-party resource into the CVS repository, so keep in mind the following:

* Do not put licensing information in your module anywhere.  Anything that is put in the Drupal repository is automatically licensed at [GPLv2](http://www.gnu.org/licenses/gpl-2.0.html).  If you are concerned that your code will not be properly licensed while it is in the review process, then ask about it before upload (as I don't know the best thing to do here).
* If you have any images, or code that looks like third-party code, we will ask you about it; it would be easier to describe it up front.
* Even if your third-party code is under a license that is compatible with Drupal, the general rule is not to allow it, so expect a discussion or just a plain "no".
