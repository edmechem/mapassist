# User 1 is Ed, password 111
User.create(
  email: 'ed@mechem.org'
  password: '123',
  first_name: 'Ed',
  last_name: 'Mechem',
)
# Next three are fakers
3.times do
  User.create(
    email: Faker::Internet.email
    password: "123",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
  )
end
