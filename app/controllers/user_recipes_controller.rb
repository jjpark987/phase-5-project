class UserRecipesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        user_recipe = UserRecipe.create!(user_id: session[:user_id], **user_recipe_params)
        render json: user_recipe, status: :created
    end

    def update
        user_recipe = UserRecipe.find_by!(user_id: session[:user_id], id: params[:id])
        user_recipe.update!(user_recipe_params)
        render json: user_recipe, status: :accepted
    end

    def destroy
        user_recipe = UserRecipe.find_by!(user_id: session[:user_id], id: params[:id])
        user_recipe.destroy
        head(:no_content)
    end

    private

    def user_recipe_params
        params.require(:user_recipe).permit(:recipe_id, :comments, :is_favorite)
    end
        
    def record_not_found
        render json: { error: ['User recipe not found'] }, status: :not_found
    end

    def record_invalid(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end
