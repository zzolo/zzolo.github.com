# encoding: UTF-8

require 'rubygems'
require 'sequel'
require 'fileutils'
require 'yaml'
require 'nokogiri'
require 'reverse_markdown'

# Borrow from
# https://github.com/jekyll/jekyll-import/blob/master/lib/jekyll/jekyll-import/drupal7.rb
#
# Used on local testing machine so it doesn't really matter about the
# db credentials

# Reads a MySQL database via Sequel and creates a post file for each post
# in wp_posts that has post_status = 'publish'. This restriction is made
# because 'draft' posts are not guaranteed to have valid dates.
D5_QUERY = " \
SELECT n.nid, \
  n.title, \
  n.status, \
  n.type, \
  n.created, \
  nr.body \
FROM \
  drupal_5_node AS n, \
  drupal_5_node_revisions AS nr \
WHERE  \
  n.vid = nr.vid \
  AND n.nid NOT IN (2, 3, 4, 6, 7, 10, 14, 15, 17, 21, 23, 24, 28, 29, 30, 32) \
ORDER BY n.created \
LIMIT 0, 200 \
  "

def process(dbname, user, pass, host = 'localhost', local_query)
  db = Sequel.mysql(dbname, :user => user, :password => pass, :host => host, :encoding => 'utf8')

  FileUtils.mkdir_p "_posts"
  FileUtils.mkdir_p "_drafts"

  db[local_query].each do |post|
    # Get required fields and construct Jekyll compatible name
    node_id = post[:nid]
    title = post[:title]
    content = post[:body]
    created = post[:created]
    time = Time.at(created)
    is_published = post[:status] == 1
    dir = is_published ? "_posts" : "_drafts"
    slug = title.strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
    name = time.strftime("%Y-%m-%d-") + slug + '.md'
    
    # Convert content to Markdown
    content = ReverseMarkdown.parse(content)
    
    # content fixes
    content = content.gsub("[[1]]", '[\[1\]]')
    content = content.gsub("http://en.wikipedia.org/wiki/ESG_(band)", "http://en.wikipedia.org/wiki/ESG_%28band%29")
    content = content.gsub("http://en.wikipedia.org/wiki/Madonna_(entertainer)", "http://en.wikipedia.org/wiki/Madonna_%28entertainer%29")
    content = content.gsub("http://en.wikipedia.org/wiki/Milemarker_(band)", "http://en.wikipedia.org/wiki/Milemarker_%28band%29")
    
    # Fix line breaks
    content = content.gsub("\r \r ", "\n\n")
    content = content.gsub("\r ", "  \n")

    # Get the relevant fields as a hash, delete empty fields and convert
    # to YAML for the header
    data = {
       'layout' => 'post',
       'title' => '' + title.to_s,
       'created' => created,
     }.delete_if { |k,v| v.nil? || v == ''}.to_yaml

    # Write out the data and content to file
    File.open("#{dir}/#{name}", "w") do |f|
      f.puts data
      f.puts "---\n\n"
      f.puts content + "\n\n"
    end

  end
end

# Run for different contentt types / queries
puts 'Procssing d5 content.'
process('zzold', 'zzold', 'zzold', 'localhost', D5_QUERY)