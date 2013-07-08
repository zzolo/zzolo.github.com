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

HAIKUS_EXPORT_URL = 'http://localhost:8888/zzolo.org/jekyll_export/haikus'

def process(url)
  FileUtils.mkdir_p "projects/portrait_and_haiku/data"
  FileUtils.mkdir_p "projects/portrait_and_haiku/images"

  response = HTTParty.get(url)
  json = JSON.parse(response.body)
  data = []

  json['nodes'].each do |node|
    n = node['node']
    
    # Copy image locally
    image_name = n['portrait'].split('/').last
    image_path = 'projects/portrait_and_haiku/images/' + image_name
    open(image_path, 'wb') do |file|
      file << open(n['portrait']).read
    end
    n['portrait'] = image_name
    
    image_name = n['portrait_thumb'].split('/').last
    image_name = image_name.split('.').first + '-thumb.' + image_name.split('.').last
    image_path = 'projects/portrait_and_haiku/images/' + image_name
    open(image_path, 'wb') do |file|
      file << open(n['portrait_thumb']).read
    end
    n['portrait_thumb'] = image_name
    
    data.push(n)
  end
  
  # Write out the data file
  File.open("projects/portrait_and_haiku/data/haikus.json", "w") do |f|
    f.puts data.to_json
  end
end

# Run for different contentt types / queries
puts 'Procssing haikus content.'
process(HAIKUS_EXPORT_URL)