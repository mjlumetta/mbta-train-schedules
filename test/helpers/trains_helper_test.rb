require 'test_helper'

class TrainsHelperTest < ActionView::TestCase
  def setup
    @raw_csv = "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status\r\n"\
               "1474428915,\"North Station\",\"129\",\"Rockport\",1474431000,0,,\"On Time\"\r\n"\
               "1474428915,\"North Station\",\"433\",\"Fitchburg\",1474431000,0,,\"On Time\"\r\n"
    @csv_lines = [ "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status",
                   "1474428915,\"North Station\",\"129\",\"Rockport\",1474431000,0,,\"On Time\"",
                   "1474428915,\"North Station\",\"433\",\"Fitchburg\",1474431000,0,,\"On Time\"" ]
    @parsed_lines = [ { "time_stamp": 1474428915, "origin": "North Station", "trip": "129", "destination": "Rockport", 
                      "scheduled_time": 1474431000, "lateness": 0, "track": "", "status": "On Time"},
                      { "time_stamp": 1474428915, "origin": "North Station", "trip": "433", "destination": "Fitchburg", 
                      "scheduled_time": 1474431000, "lateness": 0, "track": "", "status": "On Time"} ]
    @schedule_keys = [ :time_stamp, :origin, :trip, :destination, :scheduled_time, :lateness, :track, :status ]
    @string_line = { "time_stamp": "1474428915", "origin": "North Station", "trip": "129", "destination": "Rockport", 
                     "scheduled_time": "1474431000", "lateness": "0", "track": "", "status": "On Time"}
    @no_trains = "TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status\r\n"
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
    assert_equal @parsed_lines, parse_schedule_lines(@csv_lines)
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
    assert_equal parsed_line, parse_one_line(csv_line, @schedule_keys)
  end
  
  test "typing schedule line values" do
    convert_data_to_types(@string_line)
    assert_equal @parsed_lines[0], @string_line
  end
end