class Article < ApplicationRecord
  after_save :notify_subscribers

  scope :published, -> { where(publish_status: "published") }

  def as_json(options = {})
    default_params = { "author" => "Mason Stallmo" }

    default_params.merge(super(options.merge(except: [:created_at])))
  end

  def published?
    publish_status == "published"
  end

  private

  def notify_subscribers
    if (
         previously_new_record? || saved_change_to_attribute?(:publish_status)
       ) && published?
      Rails.logger.info "NOTIFYING SUBSCRIBERS"

      Subscriber.find_each do |subscriber|
        SubscriberMailer
          .with(subscriber: subscriber)
          .article_published_email
          .deliver_later
      end
    end
  end
end
