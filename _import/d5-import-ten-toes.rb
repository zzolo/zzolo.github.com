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
    nr.body, \
    f.filename \
  FROM \
    dpl_node AS n \
      LEFT JOIN dpl_files AS f ON n.nid = f.nid, \
    dpl_node_revisions AS nr \
  WHERE n.type IN ('home_news', 'writing_poetry', 'blog') \
    AND n.vid = nr.vid \
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
    content = post[:body]
    created = post[:created]
    image = post[:filename]
    time = Time.at(created)
    is_published = post[:status] == 1
    dir = is_published ? "_posts" : "_drafts"
    slug = title.strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
    name = time.strftime("%Y-%m-%d-") + slug + '.md'
    
    # Convert content to Markdown
    content = ReverseMarkdown.parse(content)
    
    # Fix some issues
    content = content.gsub(' "")', ')')
    content = content.gsub('** [', '**[')
    
    content = content.gsub('[Quest]( "Quest")', 'Quest')
    content = content.gsub('[review](Two Gallants Review "http://www.nme.com/reviews/two-gallants/7854")', '[review](http://www.nme.com/reviews/two-gallants/7854 "Two Gallants Review")')
    content = content.gsub('[First Annual Hip and Harmony Festival]( "First Annual Hip and Harmony Festival")', 'First Annual Hip and Harmony Festival')
    content = content.gsub('[www.doomtree.net]( "Doomtree")', '[Doomtree](http://www.doomtree.net)')
    content = content.gsub('[www.yonimusic.com]( "http://www.yonimusic.com")', '[yonimusic.com](http://www.yonimusic.com)')
    content = content.gsub('[trailers](by Nikolaus Geyrhalter and Wolfgang Widerhofer "Our Daily Bread Trailers")', 'trailers of Our Daily Bread by Nikolaus Geyrhalter and Wolfgang Widerhofer')
    
    # Fix line breaks
    content = content.gsub("\r \r ", "\n\n")
    content = content.gsub("\r ", "  \n")
    
    # Change image directory
    content = content.gsub("http://drupal/system/files/", "/images/posts/zzold/")
    
    # Handle images
    if !image.nil?
      content = "![](/images/posts/zzold/" + image + ")\n\n" + content
    end

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
process('ap-d5', 'ap-d5', 'ap-d5', 'localhost', D5_QUERY)