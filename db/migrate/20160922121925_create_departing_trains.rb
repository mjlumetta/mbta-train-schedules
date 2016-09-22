class CreateDepartingTrains < ActiveRecord::Migration
  def change
    create_table :departing_trains do |t|

      t.timestamps null: false
    end
  end
end
