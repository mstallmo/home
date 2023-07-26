class Subscriber < ApplicationRecord
  validates :email,
            uniqueness: {
              case_sensitive: false,
              message: "email is already subscribed",
            }
end
