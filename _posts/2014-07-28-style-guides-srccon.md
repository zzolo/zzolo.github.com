---
layout: post
title: Style guides and SRCCON
---

I just got back from [SRCCON](http://srccon.org/), and it was amazing.  SRCCON was the first of it's kind &mdash; bringing together developers, designers, and other technologists who work in (or around) newsrooms.  I was able to go because of a generous travel stipend provided by SRCCON via [Wordpress](http://wordpress.org/).

Inspired by the [Source](https://source.opennews.org/) community, which is run by Open News, a project of Mozilla and the Knight Foundation, SRCCON was an extremely valuable, well-run, and detailed event.  Everything was focused around getting to know each other and community building including discussion-focused sessions, coffee-hacking stations, plenty of mingle time, late starts to allow folks to stay up late, and evening activities such as lightning talks, beer swaps, and [Magic](http://en.wikipedia.org/wiki/Magic:_The_Gathering).  All this while having meaningful sessions and discussions about the exciting intersection of journalism and technology.

## Style guides

As part of the conference, I led a [short discussion on "Style guides"](http://schedule.srccon.org/#_session-28).  This topic came up because we recently made a first draft of a [style guide for our interactive team](http://code.minnpost.com/minnpost-styles/) at MinnPost.  Full notes and links are [up on Github](https://github.com/zzolo/srccon-style-guide-discussion).

My assumption going in was that "style guide" meant a collection of design and functionality for a web interface; so essentially I was just thinking about HTML/CSS/JS.  After doing some research, I realized I had totally forgot about the obvious news style guide, the AP Stylebook &mdash; what most people would think of if I said "style guide" in a newsroom.  This made me dig a bit deeper and start to broaden what I was thinking about, and I came up with quite a [big list of style guides](https://github.com/zzolo/srccon-style-guide-discussion#examples) for all types of things.  So, our first step in our discussion was to quickly list out things that could be stylized; here's what we came up with:

* Web interfaces
* Copy and grammar
* Tone
* Visualizations
* Project management
* Devops best practices.  Example: TwelveSteps
* Code (syntax)
* Internal communication
  * Tools to use
  * Tone
  * Ensure email has a subject
* External communication, tone
* General computer use
  * File sharing
  * Password management
* Code of Conduct
* Design
  * Typography
  * Colors
* Photography
  * Processing
  * Resizing
* Advertising
* Interaction patterns
* Web interface
* Copy, grammar

### Strength and weakness

The next activity was to break up into groups and brainstorm about what were the pros and cons (strengths and weaknesses) of the style guide.  I wanted to list these out to help get an idea of why an organization would or wouldn't make a style guide.  Here's the notes of what we all came up with.

**Pros:**

* Helps with onboarding new employees or contributors to project.
* Less debate about stylistic things
* Generally saves time
* Provides an essential, referencable source
* Forces decision making
* Can require thinking about accessibility or other things that may be often overlooked.
* Helps maintain control and scope on projects
* Makes things that don't follow require and show importance.  Shining breakthroughs.
* Don't have to start from scratch
* Suppresses whims of superiors
* Requires specific understanding of why there is a need to break or go outside the style guide.
* Offers a good amount flexibility.  "guide" not "rules".
* Offers ownership
  * Will be used by team that creates it
* Solidifies branding and identity
* Saves time building.
* Makes communication smoother.
* Provides consistency.
* Easier to maintain whatever the style guide is for.
* Can provide for an early testbed.

**Cons:**

* Requires time, commitment, and execution
* Requires maintenance
* Requires buy-in and use
* Might have to defend (often) against haters.
* Could provide a false send of security
  * Ex. just because an app passes Apple's guidelines, doesn't make it useful or important.
* Can stifle innovation or creativity
* Requires adjustment period to use
* Balancing comprehesiveness and flexibility
* Can become stale
* Not always shared across organization
  * Ex. Print department may have their own style guide, while the web department does too
* How to reconcile web and print style guides
* Overall investment
* Can become too authoritative, or "gospel-like"
* Misuse of the style guide
* Not having ownership can mean not using
  * If team uses old team's style guide
* Can be a significant barrier to entry, specifically to contributing to a (open source) project.
* Can be very negative if style guide goes against larger, universal styles
* May limit creativity
* Requires expertise

### Is there common ground?

For the last few minutes we talked about whether there is any opportunity for the community of technologists and journalists to make community-wide style guides; the AP Stylebook being a good example as it is used across many new organizations.  Also, the [ProPublica News Nerds guide](https://github.com/propublica/guides/) is an interesting example that is specific journalism but not to one newsroom.

This was a tough one to answer and definitely one we couldn't get too far in just a few minutes.  But here are a few general thoughts we came up with.

* There are definitely things that don't have or require a specific journalism context such as coding style guides.  Overall, there is no reason to write Javascript in a way that is specific to journalism.
* The AP Stylebook is somewhat unique in that AP content is so widely distribution to so many organizations.
* Design related guides are usually very tied to an organization and specifically its identity and branding which makes it difficult to allow it to be useful across organizations.
* There was also interest expressed about guides on how to do things specifically in a journalism context.
  * (Open source) tools for data processing and other journalism activitis.
  * How to write a README for other journalists.
  * How to release open source software.
  * Best way to evaluate tools.
