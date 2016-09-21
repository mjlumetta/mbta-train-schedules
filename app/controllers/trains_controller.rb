class TrainsController < ApplicationController
  respond_to :json, :html
  
  def index
    raw_csv = get_schedule_as_csv
    schedule_lines = get_schedule_lines(raw_csv)
    @trains = parse_schedule_lines(schedule_lines)
    respond_with @trains
  end
end