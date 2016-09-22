Rails.application.routes.draw do
  root 'trains#index'
  get '/index', to: 'trains#index'
  resources :trains, only: :index
end
