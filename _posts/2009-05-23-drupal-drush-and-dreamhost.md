---
layout: default
title: Drupal, Drush, and Dreamhost
created: 1243098863
---
I use [Dreamhost](http://dreamhost.com/) for some of my personal sites and for some friends.  Dreamhost's basic package is nothing too powerful, but I like them; they are [cheap](https://signup.dreamhost.com/), responsive, [responsible](http://www.dreamhoststatus.com/), [green](http://dreamhost.com/aboutus-green.html), and [funny](http://blog.dreamhost.com/).  I also love some [Drush](http://drupal.org/project/drush).  But for the life of me, the newer versions of Drush were throwing weird errors, mostly involving syntax.  But when I went into the code, I could not find any syntax errors.  Some of the errors suggested I was using PHP4, but I was like "No, I am definitely using PHP5 with Dreamhost."

Apparently, I was wrong! Looking through the issue queue of Drush today, I came across [this comment](http://drupal.org/node/436968#comment-1565796) which explains how to manually use PHP5 for the Drush alias, and it occured to me that my host could be doing that.  Searching the interwebs a little, this was the best [documentation on Dreamhost's setup](http://forum.dreamhosters.com/programming/90033-php-on-command-line.htm) that I could find.  Apparently, **Dreamhost uses PHP4 for the command line by default**.

So, I changed by alias definition in my .bash_profile file to:


<div>
{% highlight bash %}
# Drush
#-----------------------------------------------#
alias drush='/usr/local/php5/bin/php /home/alanpalazzolo/.drush/drush/drush.php'
{% endhighlight %}
</div>


And voila!  Drush is working!!!  Thanks to [ericrdb](http://drupal.org/user/226785) and the [wonderful developers of Drush](http://drupal.org/node/97249/committers).

