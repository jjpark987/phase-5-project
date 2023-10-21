class RecipesController < ApplicationController
    skip_before_action :authorize, only: [:index, :unique_attributes]

    def index
        render json: Recipe.all
    end

    def show
        render json: Recipe.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: ['Recipe not found'] }, status: :not_found 
    end

    # get '/recipes/unique_attributes'
    def unique_attributes
        attributes = Recipe.unique_attributes
        render json: attributes
    end
end
