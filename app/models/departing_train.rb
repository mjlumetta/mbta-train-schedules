class DepartingTrain < ActiveRecord::Base
  attr_accessor :time_stamp, :origin, :trip, :destination, :scheduled_time, :lateness, :track
  enum status: [ :on_time, :cancelled, :arriving, :end, :now_boarding, :info_to_follow, 
    :arrived, :all_aboard, :tbd, :departed, :delayed, :late, :hold ]
    
  def DepartingTrain.status_enum_val(status)
    status.remove!(" ").underscore
  end
end
