# User 1 is Ed, password 111; next 9 are random Fakers
User.create(username: 'edmechem', password: '111', first_name: 'Ed', last_name: 'Mechem', email: 'ed@mechem.org')
2.times {User.create(
  username: Faker::Internet.user_name,
  password: "111",
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.email
)}
