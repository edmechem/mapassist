class User < ActiveRecord::Base
  include BCrypt
  has_secure_password

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }

  def full_name
    [first_name, last_name].join(' ')
  end
end
