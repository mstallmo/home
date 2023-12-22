# frozen_string_literal: true

class Gallery < ApplicationRecord
  has_many :exhibitions, dependent: nil
  has_many :images, through: :exhibitions
end
