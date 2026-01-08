require 'open-uri'
require 'json'

class FlatsController < ApplicationController

  def index
    url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"
    # Write whatever logic that needs to display the flats
    @flats = JSON.parse(URI.parse(url).read)
  end
end
