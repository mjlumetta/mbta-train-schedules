Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root 'trains#index'
  get '/index', to: 'trains#index'
  resources :trains, only: :index
end
