---
layout: default
title: What is the Value of Process?
created: 1253764855
---

I am currently working on a project and we are having a bit of a dilemma about how to move the project forward.  So, I thought I would write an article about it, post it out to this wonderful community, and maybe get some unbiased insight from some outsiders.  I feel like myself and the others involved are all a little too invested to necessarily make the best decision; maybe I am being petty, irrational, or even short-sighted (hopefully you can let me know).  You can [read the original thread here](http://drupal.org/node/569178), and I suggest you do so to get an accurate vision of this issue. 

To me, the question is about the value of process over code and here is my story.  And in reality it should not be a decision of one or the other.

### The Situation ###

I am greatly going to simplify this situation in hopes to give a more accurate and unbiased view but there are plenty of details that are relevant to our actual discussion.

* There is a module at **version 1.0**.
* There is a group with a forked version with good code in it; we'll call it **Cool-Code-X**
* We have decided to bring these together to create a **version 2.0**

### The Decision ###

The question is how to bring things together.

1. **Option M:** **Start with version 1.0** and **bring in Cool-Code-X** changes to create version 2.0.  This requires porting the changes in Cool-Code-2 to be ported into the 1.x.
1. **Option N:** **Start with Cool-Code-X** and **bring in 1.x** changes to create version 2.0.  This requires the porting of the changes to Version 1.0 since fork to be brought into Cool-Code-X, and circumvents the CVS committing process of individual changes.

### Process and Code ###

I think **Option M** is the only way to move forward.  To me, Option N suffers from the ability to have an open process, which to me is the more valuable part of open source.  Yes, all the code is available for you to look at, but to me open source is more than just code; its about being open in all aspects of the process, allowing for discussion along each step, as well as creating the steps for discussion.  Option N also means that there is no historical record of each major and minor change that is made to the code base.

#### The Code ####

Admittedly, the code in Cool-Code-2 is well, pretty cool, hence why we are even here.  But, at the risk of offending myself and most people reading this, **code is cheap and easy**!  Yeah, I said it.  Don't get me wrong; I love coding, and I know some really intelligent people that can come up with algorithms that I couldn't even dream of myself doing.  But, let's be realistic here, who really cares about the code?  Lots of us need code; there are many example of society-changing coding algorithms.  But is a [CTools plugin](http://drupal.org/project/ctools) implementation going to be that?  Is some abstract idea of [object-orientation](http://en.wikipedia.org/wiki/Object-oriented_programming) or [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) going to change the world?  I don't think so.

Of course code is valuable.  And myself and other developers are valuable and unique.  And most of use are here because of the code.  But ask yourself this: **Why is everyone else (the millions that use software) here?**

#### More Than Code ####

In the past few years I have really come to value the idea of process.  I did a presentation at [Drupal Camp Wisconsin about "caring about code"](http://drupalcampwi.com/session/building-a-module-best-practices) (as well as put a [session in at Paris](http://paris2009.drupalcon.org/session/caring-code-building-responsible-modules)) which basically did not talk about code, cool algorithms, libraries, or the orientation of objects.  It was all about documentation, testing, coding standards, issue queues, and being a responsible software builder.  There is more to software than code!

I think a good example would be test-driven development.  Test-driven is the basic principle of creating tests as you create the main application code, so that finding bugs can be a much more quicker process.  In an abstracted way, it is about investing up front and gaining much more in the long term, hopefully the goal of any good process.  [Drupal core has recently embraced test-driven development](http://groups.drupal.org/node/9412) starting with the soon-to-come Drupal 7.  [jQuery also has an integrated test suite known as QUnit](http://docs.jquery.com/QUnit).

#### The Module and Scale ####

Let's bring it out some more.  **Is this module going to change the world?**  No.  Is it cool like the code underneath it?  I think so.  But really this is just a small, open-source project in the vast seas of the internets, and it is not going to change the world.

To me, this does not change the value of processes that I would like to adhere to.  But I will admit at different scales, different processes begin to lose or gain value.  For instance, we don't write tests for every line of code, and there is recent talk of having more than two core comitters for the Drupal core development process because it is starting to break down.  And so there is often a trade-off and all projects are somewhat unique.

#### The Drupal ####

Alan, where are you going with this?  We're getting there.  So, we'll take another step back.  **Is Drupal going to change the world?**  I would say yes.  In fact, I would argue that it already has.  But if for some reason you disagree, for arguments sake, let's agree that Drupal is a society-changing piece of software.  Now, let's look at why that is.  What are some of the things that you like about Drupal (note that my view is limited here):

* Everyone is friendly and smart (and good looking)
* That hook system is awesome
* There are tons of modules for it (and by tons, I mean an unwieldy amount)
* There are a couple dozen IRC channels and support methods
* There is 1000's of pages of documentation out there (though sometimes hard to find)
* There are dozens of Drupal shops to help us build websites, from individuals to multi-national corporations
* It's a designer's nightmare (though getting better)
* It's a developer's dream

The list goes on and on.  But my point hangs on that last note about it being a developer's dream.  Why is Drupal a developer's dream?  "Don't hack core" is the slogan for developers of Drupal, meaning that Drupal is extensible in a way that most software is not.  Drupal also does some really awesome stuff that we, as developers don't have to think about, like make forms (which are secure, extensible, and fun).

#### The How and the Value ####

So, the last and most important question: **How did (and does) Drupal become so awesome?**   Specifically how is it such a developer's dream, and how did that code get so awesome?  Is it code fairies that visit the repository every night and put some new, mind-blowing code in?  Maybe its just [webchick](http://drupal.org/user/24967) who develops the whole thing (or maybe she is a code fairy)?  Personally, I would like to think it similar to the [monkeys at typewriters](http://en.wikipedia.org/wiki/Infinite_monkey_theorem) approach.  In reality it's the **amazing extensive issue queue** for the Drupal Project (and the fantastic people who spend time at it)!  It's the fact that every change that gets put into Drupal core is reviewed, praised, spat on, torn up, questioned, tested, before it gets even considered to be put in.  Then, it happens again.  and no where in the instructions of the issue queue does it specify how cool or complex code must be.  

Let's look at some of the interesting statistics of the Drupal core issue queue:

* There are currently **27,613** issues in the queue
* A rough estimate of about **12,770** commits
* [Oldest issue](http://drupal.org/node/225450) dates back to **2001-12-17** (recently fixed for D7) which 181 comments on it
* The oldest open issue dates back to **2002-02-28**
* [Overall stats](http://drupal.org/project/issues/statistics/drupal)
* The [most comments on an issue](http://drupal.org/node/225450): **350**

I am not one to believe in statistics (my high school statistics teacher taught me that a long time ago), but I think it does start to paint a picture.  The process of making Drupal core is fucking verbose!  And to me, it's that verbosity that has made Drupal what it is today.  And though it may take me many hours to get in a patch on how to fix a one-line bug, I would not trade that process for anything.

### Finally, My Question ###

So, here is my question: **How valuable is the process?**

### Caveats ###

<ul>
<li>All the people involved in my particular issue are people I respect greatly.</li>
<li>I ask for your opinion only if it is helpful and constructive.</li>
<li>This is my view of the situation and should not be taken as the only view.</li>
</ul>
