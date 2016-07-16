Main site for Alan Pala*zzolo*.  See [zzolo.org](//zzolo.org).

## Development

The site is built with Jekyll and using only options that Github Pages will run.  Install:

1. Will need Ruby >= 2.2.2 for `github-pages` gem.  Try `rbenv` or `rvm` to manage Ruby versions on Mac.
    * See [Nokogirl install notes](http://www.nokogiri.org/tutorials/installing_nokogiri.html#mac_os_x)
    * Note needed to open XCode and install extra components to get Nokogirl compiling to happen.  As well as command line tools: `xcode-select --install`
1. `bundle install`

The site has the `baseurl` option set so that links, images, etc can be made absolute for things like feeds.  This means, to run locally, you should run like:

    jekyll serve --baseurl="" -w

Or for quicker development/regeneration:

    jekyll serve --baseurl="" -w --limit_posts 5

Color scheme:

https://coolors.co/ffbf00-e83f6f-2274a5-32936f-ffffff
