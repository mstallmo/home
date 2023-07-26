class SubscribersController < ApplicationController
  def create
    subscriber = Subscriber.new(subscriber_params)

    if subscriber.save
      redirect_to subscribers_thank_you_url
    else
      redirect_to root_url, inertia: { errors: subscriber.errors }
    end
  end

  def thank_you
    render inertia: "ThankYou/Show", props: {}
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email)
  end
end
