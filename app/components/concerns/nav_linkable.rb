# frozen_string_literal: true

module NavLinkable
  extend ActiveSupport::Concern

  included do
    def nav_links
      {"About" => "/about", "Articles" => "/articles", "Projects" => "/projects", "Speaking" => "/speaking", "Uses" => "/uses"}
    end
  end
end
