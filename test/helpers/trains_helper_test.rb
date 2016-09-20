require 'test_helper'

class TrainsHelperTest < ActionView::TestCase
  test "schedule url" do
    assert_equal "http://developer.mbta.com/lib/gtrtfs/Departures.csv", schedule_url
  end
  
  test "getting the schedule as csv" do
    assert_not_nil get_schedule_as_csv
  end
end