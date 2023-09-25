# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts 'Seeding 10 users...'

10.times do 
    User.create(
        username: Faker::Internet.username,
        email: Faker::Internet.email,
        password: '1',
        password_confirmation: '1'
    )
end

puts '... done seeding users'
