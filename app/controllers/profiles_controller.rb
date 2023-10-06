class ProfilesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def create
        render json: Profile.create!(profile_params), status: :created
    end

    def show
        render json: Profile.find(params[:id])
    end

    def update
        profile = Profile.find(params[:id])
        profile.update!(profile_params)
        render json: profile, status: :accepted
    end

    private

    def profile_params
        params.require(:profile).permit(:user_id, :sex, :age, :height, :weight, :activity_level, :health_goal, :vegetarian, :vegan, :gluten_free, :dairy_free)
    end

    def record_invalid(e)
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found
        render json: { error: ['Profile not found'] }, status: :not_found
    end
end
