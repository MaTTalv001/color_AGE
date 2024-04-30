Rails.application.routes.draw do
  get '/posts/search_by_color', to: 'posts#search_by_color'
  resources :posts do
    resources :reactions, only: [:index, :create]
  end
end