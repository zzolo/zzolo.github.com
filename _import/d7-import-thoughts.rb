# encoding: UTF-8

require 'rubygems'
require 'sequel'
require 'fileutils'
require 'yaml'
require 'nokogiri'

# Borrow from
# https://github.com/jekyll/jekyll-import/blob/master/lib/jekyll/jekyll-import/drupal7.rb
#
# Used on local testing machine so it doesn't really matter about the
# db credentials

# Reads a MySQL database via Sequel and creates a post file for each post
# in wp_posts that has post_status = 'publish'. This restriction is made
# because 'draft' posts are not guaranteed to have valid dates.
THOUGHTS_QUERY = " \
  SELECT n.nid, \
    n.title, \
    fdb.body_value AS body_value, \
    n.created, \
    n.status \
  FROM node AS n, \
    field_data_body AS fdb \
  WHERE n.type = 'idea' \
    AND n.nid = fdb.entity_id
    AND ( \
      fdb.revision_id IS NULL \
      OR n.vid = fdb.revision_id \
    ) \
  ORDER BY n.created \
  "

def process(dbname, user, pass, host = 'localhost', local_query)
  db = Sequel.mysql(dbname, :user => user, :password => pass, :host => host, :encoding => 'utf8')

  FileUtils.mkdir_p "_posts"
  FileUtils.mkdir_p "_drafts"

  db[local_query].each do |post|
    # Get required fields and construct Jekyll compatible name
    node_id = post[:nid]
    title = post[:title]
    content = post[:body_value]
    created = post[:created]
    time = Time.at(created)
    is_published = post[:status] == 1
    dir = is_published ? "_posts" : "_drafts"
    slug = title.strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
    
    # Hack up content
    content = content.gsub("[code lang=php]\r\n", "{% highlight php %}\r\n")
    content = content.gsub("[code lang=html]\r\n", "{% highlight html %}\r\n")
    content = content.gsub("[code lang=css]\r\n", "{% highlight css %}\r\n")
    content = content.gsub("[code lang=drupal6]\r\n", "{% highlight php %}\r\n")
    content = content.gsub("<code lang=php>\r\n", "{% highlight php %}\r\n")
    content = content.gsub("<code lang=javascript>\r\n", "{% highlight javascript %}\r\n")
    content = content.gsub("<code lang=javascript\">\r\n", "{% highlight javascript %}\r\n")
    content = content.gsub("<code lang=bash>\r\n", "{% highlight bash %}\r\n")
    content = content.gsub("<code lang=shell>\r\n", "{% highlight bash %}\r\n")
    content = content.gsub("\r\n<code>", "\r\n{% highlight php %}")
    content = content.gsub("\r\n[/code]", "\r\n{% endhighlight %}")
    content = content.gsub("\r\n</code>", "\r\n{% endhighlight %}")
    content = content.gsub(' lang=bash', ' lang="bash"')
    
    content = content.gsub('&', '&amp;')
    content = content.gsub('&amp;nbsp;', '&nbsp;')
    content = content.gsub('<!--break-->', '')
    content = content.gsub('<A', '<a')
    content = content.gsub('[ -d $DRUSHPATH ]', '\[ -d $DRUSHPATH \]')
    content = content.gsub('***admin/settings/api/branches/new**', '***admin/settings/api/branches/new***')
    content = content.gsub('<div style="font-size: 0.8em"><a href="http://www.tools4noobs.com/online_tools/youtube_xhtml/">Get your own valid XHTML YouTube embed code</a></div>', '')
    content = content.gsub('</th></th>', '</th></tr>')
    
    # This ensures that markdown won't be processed with code highlighting
    content = content.gsub('{% highlight ', "\r\n<div>\r\n{% highlight ")
    content = content.gsub('{% endhighlight %}', "{% endhighlight %}\r\n</div>\r\n")
    
    # Handle images
    html = Nokogiri::HTML(content)
    html.search('img').each do |img|
      place = img['src'].index('/sites/default/files')
      if !place.nil? && place > 0
        content = content.gsub(img['src'], '/images/' + img['src'].split('/').last)
      end
    end

    # Determine extension
    extension = '.html'
    if content.include? ']('
      extension = '.md'
    end
    name = time.strftime("%Y-%m-%d-") + slug + extension
    
    # Do some processing assuming md
    if extension == '.md'
      content = content.gsub('<strong>', '**')
      content = content.gsub('</strong>', '**')
      content = content.gsub('<em>', '_')
      content = content.gsub('</em>', '_')
    end

    # Get the relevant fields as a hash, delete empty fields and convert
    # to YAML for the header
    data = {
       'layout' => 'default',
       'title' => '' + title.to_s,
       'created' => created,
     }.delete_if { |k,v| v.nil? || v == ''}.to_yaml

    # Write out the data and content to file
    File.open("#{dir}/#{name}", "w") do |f|
      f.puts data
      f.puts "---\r\n\r\n"
      f.puts content
    end

  end
end

# Run for different contentt types / queries
puts 'Procssing thoughts content.'
process('zzolo', 'zzolo', 'zzolo', 'localhost', THOUGHTS_QUERY)