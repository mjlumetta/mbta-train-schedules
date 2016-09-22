require 'test_helper'

class DepartingTrainTest < ActiveSupport::TestCase
  def setup 
    @train = DepartingTrain.new
    @values = { time_stamp: 1474547103, origin: "South Station", trip: "707", destination:
                "Forge Park / 495", scheduled_time: 1474556400, track: "5", lateness: 3,
                status: "on_time" }
  end
  
  test "train is always valid" do
    assert @train.valid?
  end
  
  test "responds to timestamp" do 
    test_attribute(:time_stamp)
  end
  
  test "responds to origin" do 
    test_attribute(:origin)
  end
  
  test "responds to trip number" do
    test_attribute(:trip)
  end
  
  test "responds to destination" do
    test_attribute(:destination)
  end
  
  test "responds to scheduled time" do
    test_attribute(:scheduled_time)
  end
  
  test "responds to track number" do
    test_attribute(:track)
  end
  
  test "responds to lateness" do
    test_attribute(:lateness)
  end
  
  test "responds to status" do 
    @train.status = @values[:status]
    assert_equal @values[:status], @train.status
  end
  
  test "converting status from string to enum" do
    string_vals = [ "On Time", "Cancelled", "Arriving", "End", "Now Boarding", 
      "Info To Follow", "Arrived", "All Aboard", "TBD", "Departed", "Delayed", "Late", "Hold" ]
    enum_vals = [ :on_time, :cancelled, :arriving, :end, :now_boarding, :info_to_follow, 
      :arrived, :all_aboard, :tbd, :departed, :delayed, :late, :hold ]
    enum_vals.length.times do |index|
      assert_equal enum_vals[index].to_s, DepartingTrain.status_enum_val(string_vals[index])
    end
  end
    
  private 
  
  def test_attribute(attr_name)
    @train[attr_name] = @values[attr_name]
    assert_not_nil @train[attr_name]
    assert_equal @values[attr_name], @train[attr_name]
  end
end
