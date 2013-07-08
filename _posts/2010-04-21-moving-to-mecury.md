---
layout: post
title: Moving to Mecury
created: 1271864443
---

I have always dreamed of going into space.  I often ask people if they would go out into space if given the chance; I think it gives a small bit of insight into someone's personality.  I doubt I will be able to make it into space in my lifetime, though I think it'll be close.  But, if I can't go, this site can still move to Mercury.

Pretty cheesy intro, I know.  What this actually means is that I just moved this site from being hosted at [DreamHost](http://dreamhost.com/) to [Amazon Cloud AWS](http://aws.amazon.com/) with [Chapter Three](http://www.chapterthree.com/)'s [Pantheon Mercury](http://getpantheon.com/).  The main reason to do this was performance, but I will discuss the pros and cons of this switch below.

### Performance ###

I have done some very basic benchmarking with [AB](http://httpd.apache.org/docs/2.0/programs/ab.html) (Apache Benchmarking).  By no means is this a rigorous test, but it does add some insight into the performance increase.  I ran <code>ab</code> from a third-party server that had more consistent bandwidth and each test is for the homepage; I am running a small (default) instance.  A very rough way to read all this is to say I get **50x the performance with Mercury**.

<table>
<thead>
<tr><th>Test and Metric</th><th>DreamHost</th><th>Mercury</th><th>Increase</th></tr>
</thead>
<tbody>
<tr><td><strong>ab -n 100 -c 10</strong></td><td colspan="3"></td></tr>
<tr><td>&nbsp;&nbsp;_Failed requests_</td><td>29</td><td>0</td><td><strong>~2,900%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Requests per second_</td><td>0.98</td><td>19.81</td><td><strong>2,021%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Time per request_</td><td>1024.6ms</td><td>50.490ms</td><td><strong>2,029%</strong></td></tr>
<tr><td><strong>ab -n 1000 -c 10</strong></td><td colspan="3"></td></tr>
<tr><td>&nbsp;&nbsp;_Failed requests_</td><td>321</td><td>0</td><td><strong>~32,100%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Requests per second_</td><td>0.87</td><td>41.09</td><td><strong>4,723%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Time per request_</td><td>1150.489ms</td><td>24.335ms</td><td><strong>4,728%</strong></td></tr>
<tr><td><strong>ab -n 1000 -c 50</strong></td><td colspan="3"></td></tr>
<tr><td>&nbsp;&nbsp;_Failed requests_</td><td>7</td><td>0</td><td><strong>~700%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Requests per second_</td><td>44.86</td><td>112.15</td><td><strong>250%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Time per request_</td><td>22.292ms</td><td>8.916ms</td><td><strong>250%</strong></td></tr>
<tr><td><strong>Average</strong></td><td colspan="3"></td></tr>
<tr><td>&nbsp;&nbsp;_Failed requests_</td><td>119</td><td>0</td><td><strong>~11,900%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Requests per second_</td><td>15.57</td><td>57.68</td><td><strong>370%</strong></td></tr>
<tr><td>&nbsp;&nbsp;_Time per request_</td><td>732.46ms</td><td>21.91ms</td><td><strong>3,343%</strong></td></tr>
<tr><td><strong>Increase average</strong></td><td></td><td></td><td><strong>5,204%</strong></td></tr>
</tbody>
</table>

### What is Mercury? ###

[Mercury](http://getpantheon.com/mercury/what-is-mercury) is a set of server configurations, most commonly in the form of an [AMI](http://en.wikipedia.org/wiki/Amazon_Machine_Image), that creates a web host for a Drupal site that focuses on performance and uses other technologies such as [Pressflow](http://pressflow.org/), [Varnish](http://varnish-cache.org/), and [Apache Solr](http://lucene.apache.org/solr/).

In a more basic sense, if you wanted to set up a server to host a Drupal site and you wanted to get the most performance out of it (as if someone didn't want to); Mercury does all the initial configurations for you.

### Why Mercury? ###

Well, obviously the performance is a big deal.  But in reality, this blog doesn't see that much traffic, so there are other reasons as well.  Overall, its the combination of <acronym title="Amazon Web Services">AWS</acronym> and Mercury.

I wanted control, but I am lazy.  I now have complete control over the server that my site lives on, for better or for worse.  This is a big change form DreamHost as I was just a small user on a big server there.  The control and flexibility is great.  But I also don't want to spend a lot of time doing systems administration for my blog, hence why I had chosen DreamHost in the first place.  But Mercury provides a great middle ground: it supports the cloud infrastructure giving me the flexibility of my own server, but it does all the hard parts of configuring the server to host a Drupal website.

### Why DreamHost? ###

I still like DreamHost.  I think they are a good company and offer some of the best services for their price range.  I have heard a lot of different opinions about DreamHost but I still stand by them.

For your 5 USD a month you get a fancy interface with lots of goodies and lots of features, and practically unlimited space and transfer rates (though it doesn't work out to be as good as it sounds).  They also give you lots of control over your account considering that it is shared hosting.

### Making the Switch ###

Overall, this was really easy.  As this was my first use of AWS, most of my time was just figuring out the basics of the cloud.  Here are the rough steps to migrating a site (see [this documentation](http://groups.drupal.org/node/33078)).

1. Backup your site and database.
1. Create AWS account.
1. Make Key Pair.
1. Create an instance with the Mercury AMI.
1. Log into the instance and read the included <code lang="bash">/root/README.txt</code> file.  For those new to AWS, you have to use your key pair file to ssh in, for instance: <code lang="bash">ssh -i /path/to/local/pem/file root@public.dns.for.your.instance</code>
1. The default site is found at <code lang="bash">/var/www/</code>, I would suggest copying this somewhere just in case.
1. Create a root password for MySQL.  Set up a new database and put in your database dump.
1. Copy your files, modules, and themes over the existing site.
1. Update settings.php.
1. Run Druapl update: <code lang="bash">drush updb</code>
1. This should do it.  Use your public DNS for your instance to view the site.
1. Set up an Elastic IP (a.k.a. dedicated IP) and update DNS and other things as needed.

### Final Thought ###

Overall, Mercury is awesome and really takes out a huge amount of work in setting up an environment for Drupal with some great services that focuses on performance and I can really tell the difference in making the switch.

Do note, I have switched from an environment where I don't have to worry about much, to having to know about it all.  Don't try to switch to AWS and Mercury unless you know how to set up a web server from scratch; Pantheon may do a lot of the heavy lifting, but there is no GUI for it.  If you are not that technical, go with hosting that takes care of these things.  **If you have the knowledge and the resources, definitely use Mercury to get the most performance out of Drupal**.
