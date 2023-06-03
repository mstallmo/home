# frozen_string_literal: true

class SidebarLink < ViewComponent::Base
  def initialize(path, text:, icon: nil)
    @path = path
    @text = text
    @icon = icon
  end
end
