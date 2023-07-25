Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#show"

  get "about", to: "about#show"
  get "uses", to: "uses#show"

  resources :articles, only: %i[index show]
  resources :projects, only: [:index]
end
