Add your ActiveRecord models here.

You can create them by being in the application root directory and running, e.g.,

be rake generate:model NAME=User


if using a user.rb model, make sure to include:

  include BCrypt
  has_secure_password

this will allow bcrypt to encrypt the password as it comes in from a form

to use BCrypt's
```password_digest```
feature (which automatically  gives you the password methods & authorization - you don't have to write them), be sure to
```gem uninstall bcrypt```
and remove all old versions, then
```gem uninstall bcrypt-ruby```
, then finally
```gem install bcrypt```
