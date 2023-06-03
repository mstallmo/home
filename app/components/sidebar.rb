# frozen_string_literal: true

class Sidebar < ViewComponent::Base
  private

  def navigation_links
    [
      Link.new(path: root_path, text: "Dashboard", icon: Icons::Home.new),
      Link.new(path: teams_path, text: "Team", icon: Icons::Team.new),
    ]
  end
end

class Link
  attr_reader :path, :text, :icon

  def initialize(path:, text:, icon: nil)
    @path = path
    @text = text
    @icon = icon
  end
end
