# zzolo.org

Main site for Alan Pala*zzolo*. See [zzolo.org](//zzolo.org).

## Development

The site is built with Jekyll and using only options that Github Pages will run. Install:

1. Will need Ruby >= 2.2.2 for `github-pages` gem. Try `rbenv` or `rvm` to manage Ruby versions on Mac.
   - See [Nokogirl install notes](http://www.nokogiri.org/tutorials/installing_nokogiri.html#mac_os_x)
   - Note needed to open XCode and install extra components to get Nokogirl compiling to happen. As well as command line tools: `xcode-select --install`
   - Make sure bundler is installed: `gem install bundler`
1. Ruby gems: `bundle install --path vendor/bundle`
1. Node modules: `npm install`

To build before publishing:

    npm run build

For development:

    npm run dev

### Content

- **Posts**: HTML, Markdown in `_posts/`
- **Pages**: Directory structured HTML, Markdown in `pages/`
- **Projects**: List of projects on homepage `/` are managed in `_data/projects.json`
- **Sketchbook**: Notebook entries are managed in `_data/sketchbook.json` and in `sketchbook/`.

### JS

- JS that is available on every page is managed in `_js/app.js`
- All files in `_js/*.js` will be bundled together in similar name file in `js/*.bundle.js`
  - These are bundled with Webpack.  Can use Svelte.
