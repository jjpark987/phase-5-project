class RecipesController < ApplicationController
    def index
        render json: Recipe.all
    end
end
