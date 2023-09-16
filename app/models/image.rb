# frozen_string_literal: true

class Image < ApplicationRecord
  has_many :exhibitions, dependent: nil
  has_many :galleries, through: :exhibitions

  has_one_attached :media do |attachable|
    attachable.variant :thumb,
                       resize_to_fit: [1260, 720],
                       saver: {
                         quality: 100,
                       }
  end

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

  def thumbnail_url
    media.variant(:thumb).processed.url
  end

  def serializable_hash(options = {})
    default_options = { methods: :thumbnail_url }

    super(default_options.merge(options))
  end
end
