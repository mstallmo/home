class SubscriberMailer < ApplicationMailer
  def article_published_email
    @subscriber = params[:subscriber]
    @url = articles_url
    mail(to: @subscriber.email, subject: "New Articles!")
  end
end
