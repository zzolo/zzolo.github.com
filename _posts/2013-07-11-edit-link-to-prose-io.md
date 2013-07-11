---
layout: post
title: Edit link to Prose.io from Jekyll site
---

[Prose.io](http://prose.io/) is an excellent Markdown (or any text file) editor aimed at creating a web based interface to maintain content on Github which is more than likely running through [Jekyll](http://jekyllrb.com/).

I wanted a quick way to link to Prose.io to edit page on the site, specifically from my phone and did not want to spend time navigating through the file structure to do it.  I also wanted a way to quickly add posts.  So, here are some example snippets of code to do that in your Jekyll site (update the repo and user name as appropriate to your site).

{% highlight erb %}
{% raw %}
  <!-- Edit current page -->
  <a href="{% if page.path %}//prose.io/#zzolo/zzolo.github.com/edit/master/{{ page.path }}{% else %}//prose.io/#zzolo/zzolo.github.com{% endif %}" target="_blank">Edit this page in Prose.io</a>
  
  <!-- Add post -->
  <a href="//prose.io/#zzolo/zzolo.github.com/new/master/_posts" target="_blank">Add a post with Prose.io</a>
{% endraw %}
{% endhighlight %}