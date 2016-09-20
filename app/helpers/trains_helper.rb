module TrainsHelper
  def schedule_url
    "http://developer.mbta.com/lib/gtrtfs/Departures.csv"
  end
  
  def get_schedule_as_csv
    uri = URI(schedule_url)
    Net::HTTP.get(uri)
  end
end
