class ProfilesController < ApplicationController
    def create
        render json: Profile.create!(profile_params), status: :created
    rescue ActiveRecord::RecordInvalid
        render json: { error: ['Profile already created for this user'] }, status: :unprocessable_entity
    end

    private

    def profile_params
        params.require(:profile).permit(:user_id, :sex, :age, :weight, :vegetarian, :vegan, :gluten_free, :dairy_free, :health_goal)
    end
end
