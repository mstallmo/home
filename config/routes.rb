Rails.application.routes.draw do
  root "home#show"

  get "about", to: "about#show"
  resources :articles, only: %i[index show]
  resources :projects, only: %i[index show]
  get "uses", to: "uses#show"
end
