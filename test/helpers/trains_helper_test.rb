require 'test_helper'

class TrainsHelperTest < ActionView::TestCase
  def setup
    @raw_csv = "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status\r\n"\
               "1474428915,\"North Station\",\"129\",\"Rockport\",1474431000,0,,\"Arriving\"\r\n"\
               "1474428915,\"North Station\",\"433\",\"Fitchburg\",1474431000,0,,\"Arriving\"\r\n"
    @csv_lines = [ "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status",
                   "1474428915,\"North Station\",\"129\",\"Rockport\",1474431000,0,,\"Arriving\"",
                   "1474428915,\"North Station\",\"433\",\"Fitchburg\",1474431000,0,,\"Arriving\"" ]
    @parsed_lines = [ DepartingTrain.new("time_stamp": 1474428915, "origin": "North Station", "trip": "129", "destination": "Rockport", 
                      "scheduled_time": 1474431000, "lateness": 0, "track": "", "status": "arriving"),
                      DepartingTrain.new("time_stamp": 1474428915, "origin": "North Station", "trip": "433", "destination": "Fitchburg", 
                      "scheduled_time": 1474431000, "lateness": 0, "track": "", "status": "arriving") ]
    @schedule_keys = [ :time_stamp, :origin, :trip, :destination, :scheduled_time, :lateness, :track, :status ]
    @string_line = { "time_stamp": "1474428915", "origin": "North Station", "trip": "129", "destination": "Rockport", 
                     "scheduled_time": "1474431000", "lateness": "0", "track": "", "status": "Arriving"}
    @no_trains = "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status\r\n"
  end
  
  test "getting and parsing train schedule" do
    train_schedule = get_train_schedule
    assert_not_nil train_schedule
    assert_equal Array, train_schedule.class 
    train_schedule.each do |train_line|
      assert_equal DepartingTrain, train_line.class
    end
  end
  
  test "schedule url" do
    assert_equal "http://developer.mbta.com/lib/gtrtfs/Departures.csv", schedule_url
  end
  
  test "getting the schedule as csv" do
    assert_not_nil get_schedule_as_csv
  end
  
  test "splitting csv into lines" do
    assert_equal @csv_lines, get_schedule_lines(@raw_csv)
  end
  
  test "splitting csv into lines with no trains" do
    assert_equal [@csv_lines[0]], get_schedule_lines(@no_trains)
  end
  
  test "splitting csv into lines with empty string" do
    assert_equal [], get_schedule_lines("")
  end
  
  test "parsing schedule lines" do
    actual_lines = parse_schedule_lines(@csv_lines)
    @parsed_lines.length.times do |index|
      test_model_equality @parsed_lines[index], actual_lines[index]
    end
  end
  
  test "parsing schedule lines with no trains" do
    assert_equal [], parse_schedule_lines([@csv_lines[0]])
  end
  
  test "parsing schedule lines with empty string" do 
    assert_equal [], parse_schedule_lines([])
  end
  
  test "getting schedule keys" do
    assert_equal @schedule_keys, schedule_keys(@csv_lines[0])
  end
  
  test "parsing one line" do
    csv_line = @csv_lines[1]
    parsed_line = @parsed_lines[0]
    test_model_equality parsed_line, parse_one_line(csv_line, @schedule_keys)
  end
  
  test "storing data in model" do
    test_model_equality @parsed_lines[0], convert_to_model(@string_line)
  end
  
  private 
  
  def test_model_equality(expected, actual) 
    assert_equal expected.time_stamp, actual.time_stamp
    assert_equal expected.origin, actual.origin
    assert_equal expected.destination, actual.destination
    assert_equal expected.trip, actual.trip
    assert_equal expected.track, actual.track
    assert_equal expected.scheduled_time, actual.scheduled_time
    assert_equal expected.lateness, actual.lateness
    assert_equal expected.status, actual.status
  end
end