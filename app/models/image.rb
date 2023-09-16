# frozen_string_literal: true

class Image < ApplicationRecord
  has_many :exhibitions, dependent: nil
  has_many :galleries, through: :exhibitions

  has_one_attached :media

  scope :homepage, -> { where(homepage: true) }

  class << self
    def homepage_urls
      homepage.map do |image|
        image
          .media
          .variant(resize_to_fill: [300, 330], saver: { quality: 100 })
          .processed
          .url
      end
    end
  end
end
