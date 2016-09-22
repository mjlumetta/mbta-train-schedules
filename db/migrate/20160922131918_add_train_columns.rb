class AddTrainColumns < ActiveRecord::Migration
  def change
    add_column :departing_trains, :time_stamp, :integer
    add_column :departing_trains, :origin, :string 
    add_column :departing_trains, :trip, :string 
    add_column :departing_trains, :destination, :string 
    add_column :departing_trains, :scheduled_time, :string 
    add_column :departing_trains, :lateness, :integer 
    add_column :departing_trains, :status, :integer 
    add_column :departing_trains, :track, :string 
  end
end
