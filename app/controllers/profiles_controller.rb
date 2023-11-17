class ProfilesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def show
        render json: Profile.find_by!(user_id: session[:user_id], id: params[:id])
    end

    def create
        render json: Profile.create!(user_id: session[:user_id], **profile_params), status: :created
    end

    def update
        profile = Profile.find_by!(user_id: session[:user_id], id: params[:id])
        profile.update!(profile_params)
        render json: profile, status: :accepted
    end

    private

    def profile_params
        params.require(:profile).permit(:sex, :age, :height, :weight, :activity_level, :health_goal, :vegetarian, :vegan, :gluten_free, :dairy_free)
    end
    
    def record_not_found
        render json: { error: ['Profile not found'] }, status: :not_found
    end

    def record_invalid(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end
