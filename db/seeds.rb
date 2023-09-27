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

puts 'Seeding 10 profiles to the existing 10 users...'

id = 1

10.times do
    Profile.create(
        user_id: id,
        sex: ['male', 'female'].sample,
        age: rand(12..70),
        weight: rand(90.0..200.0).round(1),
        vegetarian: [true, false].sample,
        vegan: [true, false].sample,
        gluten_free: [true, false].sample,
        dairy_free: [true, false].sample,
        health_goal: ['lose', 'maintain', 'gain'].sample
    )

    id += 1
end

puts '... done seeding profiles'
