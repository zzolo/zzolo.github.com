---
layout: post
title: The Determined Dill
---

My good friends at [Squawk](//squawkproductions.com/) made a short about a dude who goes crazy trying to open a jar of pickles, and decided the best way to premiere the film would be to create the first [Minnesota Pickle Festival](//mnpicklefestival.com/).  This meant that there had to be more than just a film, and all of it had to involve pickles.  There was lots of fun pickle-themed activites including pickle-flavored beer (not great, but better than you might think), pickle contests, and a boobbing for pickle sort-of thing.

My contribution was to make a pickle-themed video game.  After some deliberation, we decided on a pickle [jumper](//en.wikipedia.org/wiki/Doodle_Jump) sort of game.  Caitlin and Sam created some amazing artwork, and I did the coding and animation parts.  You can [play it](//zzolo.org/determined-dill) right now in your browser.

[![Screenshot of Determined Dill](/images/projects/determined-dill.png)](//zzolo.org/determined-dill)

This was my first browser-based game, and actually the first game I coded since I was in high school.  I decided to use [Phaser](//phaser.io/) for my framework as it seemed popular, open-source, had some examples of the type of game I wanted to create, and the code made some sense.  I liked working with Phaser, and there were lots of good examples and forums that would get me most of the way, but when needing to change specifics, I found the code documentation to be not as helpful.  Still, I was able to make a functional game that I am proud of.  You can check out my [code on Github](https://github.com/zzolo/determined-dill).

We also wanted people to be able to play it at the festival arcade-ish-style.  We didn't build a large arcade unit, but instead made a stand with a controller on it that connected to a large tv.  This was powered by a Raspberry Pi, which meant there were some issues having a lot less resources (CPU/GPU and RAM) even with a Raspberry Pi 2.  In the code base there are instructions and scripts to have the game load on start.

![Determined Dill out in the world](/images/posts/pickle-03.JPG)

<div class="thumbnails">
  <a target="_blank" href="/images/posts/pickle-01.JPG"><img src="/images/posts/pickle-01.JPG" /></a>
  <a target="_blank" href="/images/posts/pickle-02.JPG"><img src="/images/posts/pickle-02.JPG" /></a>
  <a target="_blank" href="/images/posts/pickle-me.JPG"><img src="/images/posts/pickle-me.JPG" /></a>
</div>
