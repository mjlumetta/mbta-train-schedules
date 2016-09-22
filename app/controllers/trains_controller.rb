class TrainsController < ApplicationController
  respond_to :json, :html
  
  def index
    @trains = get_train_schedule
    respond_with @trains
  end
end