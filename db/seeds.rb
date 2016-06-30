# User 1 is Ed, password 111
User.create(
  username: 'edmechem',
  password: '123',
  first_name: 'Ed',
  last_name: 'Mechem',
  email: 'ed@mechem.org'
)
# Next three are fakers
3.times do
  User.create(
    username: Faker::Internet.user_name,
    password: "123",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email
  )
end
