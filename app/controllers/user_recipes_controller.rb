class UserRecipesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: UserRecipe.all
    end

    def create
        user_recipe = UserRecipe.create!(user_recipe_params)
        render json: user_recipe, status: :created
    end

    private

    def user_recipe_params
        params.require(:user_recipe).permit(:user_id, :recipe_id, :rating, :comments, :is_favorite)
    end

    def record_invalid(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end
