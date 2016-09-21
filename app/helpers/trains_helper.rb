module TrainsHelper
  def get_schedule_as_csv
    uri = URI(schedule_url)
    Net::HTTP.get(uri)
  end
  
  def get_schedule_lines(schedule_as_csv)
    schedule_as_csv.split("\r\n")
  end
  
  def parse_schedule_lines(schedule_lines)
    if schedule_lines.length < 1 
      return []
    end
    keys = schedule_keys(schedule_lines.slice!(0))
    parsed_lines = []
    schedule_lines.each do |train|
      parsed_lines.push(parse_one_line(train, keys))
    end
    parsed_lines
  end
  
  private
  
  def schedule_url
    "http://developer.mbta.com/lib/gtrtfs/Departures.csv"
  end
  
  def schedule_keys(first_csv_line)
    keys = first_csv_line.split(",")
    keys.map do |key|
      key.underscore.to_sym
    end
  end
  
  def parse_one_line(line, schedule_keys)
    parsed_line = {}
    train_data = line.split(",")
    schedule_keys.length.times do |index|
      parsed_line[schedule_keys[index]] = train_data[index].remove!("\"")
    end
    convert_data_to_types(parsed_line)
    parsed_line
  end
  
  def convert_data_to_types(train_line)
    int_keys = [ :time_stamp, :scheduled_time, :lateness ]
    int_keys.each do |key|
      train_line[key] = train_line[key].to_i
    end
    train_line
  end
end