---
layout: post
title: Open Twin Cities Hackathon Re-Cap
created: 1361923754
---

This past Saturday, [Open Twin Cities](http://www.opentwincities.org/) held its first hackathon at the awesome [Free Geek Twin Cities](http://freegeektwincities.org/).  This was part of two larger events, [International Open Data Day](http://opendataday.org/) and [Code Across America](http://brigade.codeforamerica.org/pages/codeacross).  We had an amazing time and got some great things accomplished in 8 hours.  And though we had practically no budget, very little time to plan, and a space that I compared to an abandoned warehouse, we had 20+ awesome people show who fully jumped into making our community better through technology.

### The Morning

The beginning of the day began with introductions and a few "icebreaking" games to help loosen people up a little.  Though these are often pretty cheesy, they can be critical to ensuring people connect and work smoothly together (see my recent post on how [hackathons are just community building events](http://zzolo.org/thoughts/what-hackathons-really-are)).

We then spent the rest of the morning brainstorming project ideas and then matching up skills to those ideas.  This gave us a nice view of what skills we had as a group and what people were interested in.  And even though we did not work on all the great ideas, we did [capture all the project ideas](https://groups.google.com/forum/?fromgroups=#!topic/twin-cities-brigade/K6PpNKuJo-o) and skills to be able to reference them later.

### Build Time

After an excellent lunch provided by [E-Democracy](http://forums.e-democracy.org/), groups were formed and folks started working.

#### Data Source Documentation

<img src="/images/posts/data-sources.png" width="210" height="150" alt="" title="">

Kristen, Amy, and Jake worked on documenting and linking data source in the Twin Cities and Minnesota, almost a 1,000 datasets!  This is an ongoing goal of Open Twin Cities and helps in planning a future hackathon that will be data focused; finding data sources is necessary given that there are not many data catalogs available in our state (the [Minnesota Data Catalog](http://www.state.mn.us/opendata/data.html) is alright, but is not really updated or updatable).

* The [main list is in a Google spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AtkFCdxQ11AOdGpWWnpuVzdaNG1SVG40MXlyZ0hSVEE&amp;usp=sharing#gid=13).
* Data sources include MN Geo, MPCA, MN Legislature, MN DNR, MetroGIS and more.

#### Technology Center Data

<img src="/images/posts/tlc-ctc-locations_0.png" width="210" height="150" alt="" title="">

Elise, Mary Anne, Bill, and Alison worked with the [Technology Literacy Collaborative](http://tlc-mn.org/) (TLC) to help expose their amazing list of [community technology centers](http://tlc-mn.org/ctc) data.

#### St. Paul Crime Data

<img src="/images/posts/st-paul-crimes.png" width="210" height="150" alt="" title="">

Rodrigo and Michael worked on starting to parse out the [crime data in St. Paul](http://www.stpaul.gov/DocumentCenter/) which reports individual crimes (with the address slightly redacted) in weekly MS Excel files tucked away in a complicated interface.  So, Rodrigo spent a fair amount of time just trying to scrape the list of report files: [scraper for list of documents](https://scraperwiki.com/scrapers/findstpaulpoliceincidentreports/) and [scraper for getting data from documents](https://scraperwiki.com/scrapers/stpaulcrimestat).  Michael spent time parsing and visualizing a single report; you can see a [basic St. Paul crime data](http://michaelaltmann.cartodb.com/tables/3978/public#/map) built with CartoDB.

#### Visualizing Minneapolis Crime Data

<img src="/images/posts/mpls-crime-data.png" width="210" height="150" alt="" title="">

Kristina and Dan worked on visualizing some of the [Minneapolis crime data](http://www.minneapolismn.gov/police/statistics/crime-statistics_codefor_statistics) which is released monthly in aggregate in MS Excel files.  They built a visualization in D3; you can see a [screenshot](https://www.evernote.com/shard/s37/sh/d4b5796e-2fc5-4b5d-9ba0-053a1a947c00/2d57d113ff42418f94c5da4ac7e11c13) here, and [the code on Github](https://github.com/gelicia/mplsCrimeMapODD).

### Conversation with elected officials (or candidates)

Cam Winton, a Minneapolis mayoral candidate came by to see what we were doing.  The event, as well as the Open Twin Cities group, is non-partisan, but the topic of open government is extremely important and promoting the conversation between elected officials and our "civic hackers" is critical to making change.  Cam came by not really knowing what a hackathon is which I think is pretty brave.  He watched as each team presented their work and got a great sense of what this community cares about and needs from the elected officials on all levels of government.  I do hope we can get more public servants coming to our events.

### In Conclusion

We had a really amazing time and strengthened our Open Twin Cities community!

Look for the following events (still in planning):

* [Visualizing Neighborhoods: A Hackathon for Good](http://visualizingneighborhoods.eventbrite.com/) on May 25th.
* [National Day of Hacking](http://hackforchange.org/) on June 1st and/or 2nd.
* A CityCamp MN happening in the fall.

(Images from the event taken by [Steven Clift](http://forums.e-democracy.org/groups/projects/messages/post/2Zz5ShpIbvR4jyibuxel32))
