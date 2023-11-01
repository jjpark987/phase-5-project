Rails.application.routes.draw do
    # Authentication
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
    # Profile
    resources :profiles, only: [:create, :show, :update]
    # Recipe
    get '/recipes/unique_attributes', to: 'recipes#unique_attributes'
    resources :recipes, only: [:index, :show, :create, :destroy]
    # UserRecipe
    resources :user_recipes, only: [:index, :create]
    # Routing logic: fallback requests for React Router.
    # Leave this here to help deploy your app later!
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
