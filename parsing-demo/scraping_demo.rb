require "open-uri"
require "nokogiri"

# Let's scrape recipes from https://www.bbcgoodfood.com
puts "Please enter an ingredient"
ingredient = gets.chomp
url = "https://www.bbcgoodfood.com/search?q=#{ingredient}"

html_file = URI.open(url).read
# p html_file

html_doc = Nokogiri::HTML(html_file)
# p html_doc

search_results = html_doc.search(".card__section h2.heading-4")
search_results.each do |search_result|
  puts search_result.text.strip
  puts search_result.attribute("href")

end
