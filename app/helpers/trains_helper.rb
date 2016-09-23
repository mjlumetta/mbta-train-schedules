module TrainsHelper
  def get_train_schedule
    raw_csv = get_schedule_as_csv
    schedule_lines = get_schedule_lines(raw_csv)
    parse_schedule_lines(schedule_lines)
  end
  
  private
  
  def schedule_url
    "http://developer.mbta.com/lib/gtrtfs/Departures.csv"
  end
  
  def get_schedule_as_csv
    uri = URI(schedule_url)
    Net::HTTP.get(uri)
  end
  
  def get_schedule_lines(schedule_as_csv)
    schedule_as_csv.split("\r\n")
  end
  
  def parse_schedule_lines(schedule_lines)
    return [] if schedule_lines.length < 1
    keys = schedule_keys(schedule_lines.slice!(0))
    schedule_lines.map do |train|
      parse_one_line(train, keys)
    end
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
    convert_to_model(parsed_line)
  end
  
  def convert_to_model(train_line)
    DepartingTrain.new(
      time_stamp: train_line[:time_stamp].to_i,
      origin: train_line[:origin],
      trip: train_line[:trip],
      destination: train_line[:destination],
      track: train_line[:track],
      scheduled_time: train_line[:scheduled_time].to_i,
      lateness: train_line[:lateness].to_i,
      status: DepartingTrain.status_enum_val(train_line[:status])
    )
  end
end