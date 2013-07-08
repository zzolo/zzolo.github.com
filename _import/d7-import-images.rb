# encoding: UTF-8

require 'rubygems'
require 'fileutils'
require 'yaml'
require 'nokogiri'
require 'json'
require 'httparty'
require 'date'
require 'open-uri'

# Borrow from
# https://github.com/jekyll/jekyll-import/blob/master/lib/jekyll/jekyll-import/drupal7.rb
#
# Used on local testing machine and create JSON export
# view.

IMAGES_EXPORT_URL = 'http://localhost:8888/zzolo.org/jekyll_export/images'

def process(url)

  FileUtils.mkdir_p "_posts"
  FileUtils.mkdir_p "_drafts"
  FileUtils.mkdir_p "images/posts"

  response = HTTParty.get(url)
  json = JSON.parse(response.body)

  json['nodes'].each do |node|
    n = node['node']
    
    # Get required fields and construct Jekyll compatible name
    time = Time.parse(n['date_taken'])
    is_published = n['published'] == 'Yes'
    dir = is_published ? '_posts' : '_drafts'
    slug = n['title'].strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
    name = time.strftime("%Y-%m-%d-") + slug + '.md'
    
    # Copy image locally
    image_extension = n['image'].split('.').last
    image_path = 'images/posts/' + slug + '.' + image_extension
    open(image_path, 'wb') do |file|
      file << open(n['image']).read
    end
    
    # Make content
    content = ''
    content += "![](/" + image_path + ")\r\n\r\n"
    content += n['description'] + "\r\n\r\n"
    content += '<div class="location">' + "\r\n" + '<span class="geojson">' + 
      n['location'] + '</span>' + "\r\n" + '</div>' + "\r\n"

    # Get the relevant fields as a hash, delete empty fields and convert
    # to YAML for the header
    data = {
       'layout' => 'post',
       'title' => '' + n['title'].to_s,
       'created' => time.to_time.to_i,
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
puts 'Procssing images content.'
process(IMAGES_EXPORT_URL)