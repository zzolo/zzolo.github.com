---
layout: default
title: HTML Subitles
created: 1237779726
---
So, I realized recently that I should have subtitles in my content types.  It adds better context to content, especially when viewing only titles.  Then, I started to think about how I would implement this.  The Drupal side is easy, but the really questions is: **What markup is appropriate for subtitles?**

### The Options

Well, the first thing that came up when searching the ol' inter-tubes, was [The Semantics of Subtitles Quiz](http://www.quirksmode.org/blog/archives/2007/10/toughquiz_vii_t.html), which was exactly what I was looking for.  Unfortunately there is no definite answer, but lots of different opinions.  Among them are the following:

#### Same Header Tag as the Subtitle.


<div>
{% highlight html %}
<h1>Title</h1>
<h1>Sub-Title</h1>
{% endhighlight %}
</div>


#### Next Header Tag as the Subtitle.


<div>
{% highlight html %}
<h1>Title</h1>
<h2>Sub-Title</h2>
{% endhighlight %}
</div>


#### Arbitrary Tag and Class as Subtitle


<div>
{% highlight html %}
<h1>Title</h1>
<div class="subtitle">Sub-Title</div>
{% endhighlight %}
</div>


#### Span in Header Subtitle


<div>
{% highlight html %}
<h1>Title <span class="subtitle">Sub-Title</span></h1>
{% endhighlight %}
</div>


### My Solution

So, first thing I will point out is that there is not semantic tag for subtitles in <acronym title="Hypertext Markup Language">HTML</acronym>.  Meaning there is no specified way to do this.  So, then there are different directions to go from there.  The two main questions to ask are the following, both of which are relative questions:

* What's most semantic?
* What's most <acronym title="Search Engine Optimization">SEO</acronym> friendly?

I decided to focus on what I thought was most semantic, but what happens most index friendly as well.  It is important to point out that, though there are some best practices to ensure top ranking in search results, it is still a [dark art](http://www.beanstalk-inc.com/articles/seo/dark-arts.html).  I chose to embed my subtitle within the header tag that contained the actual title.  Here are my main reasons against the other options:

* Using the same or different headers messes with the outline of the page which is defined by the headers.  A subtitle is not a header and does not define a section of the content.
* The subtitle is actually just a part of the title, in my opinion.  If it cannot actually have its own tag, a subtitle defaults to the title itself.
* My dark art (SEO) gut-feeling thinks that having more descriptive headers is only a good thing.  This is only a premonition.

At long last, we have a solution.  But, as I was reading through the many comments on the quiz, someone did point out that, with this method, we must account for <acronym title="Cascading Style Sheets">CSS</acronym> being turned off.  So, with that in mind, we want to put in a separator between the title and subtitle then make it disappear with CSS.

#### HTML


<div>
{% highlight html %}
<h1> Main Title
  <span class="subtitle-separator">
  : 
  </span>
  <span class="subtitle">
   Subtitle Text Here
  </span>
</h1>
{% endhighlight %}
</div>


#### CSS


<div>
{% highlight css %}
.subtitle-separator { display: none; }
.subtitle {
  display: block;
  font-size: .5em;
  color: #999999;
}
{% endhighlight %}
</div>
