class User < ApplicationRecord
    has_one :profile

    has_secure_password

    validates :email, :username, presence: true, uniqueness: true
end
