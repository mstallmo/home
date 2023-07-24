class Article < ApplicationRecord
  def as_json(options = {})
    default_params = { "author" => "Adam Wathan" }

    default_params.merge(super(options.merge(except: [:created_at])))
  end
end
