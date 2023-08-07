Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # User Onboarding TODO:
  # - First time user registration flow
  # - Password reset
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               # registrations: "users/registrations",
             },
             skip: %i[registrations passwords]

  # Defines the root path route ("/")
  root "home#show"

  get "about", to: "about#show"
  get "uses", to: "uses#show"

  resources :articles, only: %i[index show]
  resources :projects, only: [:index]
  resources :subscribers, only: [:create]
  get "subscribers/thank_you", to: "subscribers#thank_you"

  # Site administration routes
  namespace :admin do
    get "dashboard", to: "dashboard#show"
  end
end
