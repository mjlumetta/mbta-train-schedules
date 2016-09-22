class FixScheduledTimeType < ActiveRecord::Migration
  def change
    remove_column :departing_trains, :scheduled_time 
    add_column :departing_trains, :scheduled_time, :integer
  end
end
