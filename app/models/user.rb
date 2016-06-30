class User < ActiveRecord::Base
  include BCrypt

  validates :username, presence: true

  has_secure_password

  def full_name
    [first_name, last_name].join(' ')
  end

end
