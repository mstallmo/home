# forzen_string_literal: true

module Styleable
  extend ActiveSupport::Concern

  included do
    def clsx(*class_names)
      class_names
        .filter { |class_name| class_name.present? }
        .reduce("") do |computed_classes, class_name|
          computed_classes + "#{class_name} "
        end
    end
  end
end
