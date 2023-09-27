class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    # post '/signup'
    def create
        render json: User.create!(user_params), status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    # get '/me'
    def show
        render json: User.find(session[:user_id])
    rescue ActiveRecord::RecordNotfound
        render json: { error: ['Not authorized'] }, status: :unauthorized
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end
end
