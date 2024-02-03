# frozen_string_literal: true

module Templates
  module Spotlight
    module Headers
      class AvatarComponent < ApplicationComponent
        include Styleable

        def initialize(large: false, home_page: false, class_name: "", style: "")
          @large = large
          @home_page = home_page
          @class_name = class_name
          @style = style
        end

        def large?
          @large
        end

        def home_page?
          @home_page
        end
      end
    end
  end
end
