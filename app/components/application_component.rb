# frozen_string_literal: true

class ApplicationComponent < ViewComponent::Base
  def initialize(class_name: "", style: "")
    @class_name = class_name
    @style = style
  end
end
