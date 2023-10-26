class RecipesController < ApplicationController
    skip_before_action :authorize, only: [:index, :unique_attributes]

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: Recipe.all
    end

    def show
        render json: Recipe.find(params[:id])
    end

    def create
        recipe = Recipe.create!(recipe_params)
        render json: recipe, status: :created
    end

    # get '/recipes/unique_attributes'
    def unique_attributes
        attributes = Recipe.unique_attributes
        render json: attributes
    end

    private

    def recipe_params
        params.require(:recipe).permit(:name, :image, :is_vegetarian, :is_vegan, :is_gluten_free, :is_dairy_free, :calories, :proteins, :carbs, :fats, :servings, :cuisines => [], :types => [], :ingredients => [], :instructions => [])
    end

    def record_not_found
        render json: { error: ['Recipe not found'] }, status: :not_found
    end

    def record_invalid(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end
