# frozen_string_literal: true

class Exhibiton < ApplicationRecord
  belongs_to :gallery
  belongs_to :image
end
