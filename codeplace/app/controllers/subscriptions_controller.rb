class SubscriptionsController < ApplicationController

  before_filter :authenticate_user!

  def create
    user = current_user

    #gets the credit card details submitted in the form
    token = params[:stripeToken]

    #create a customer
    customer = Stripe::Customer.create(
      card: token,
      plan: 2,
      email: user.email
    )

    #subscribe the user to a plan
    user.subscribed = "pro"
    user.stripeid = customer.id
    user.save

    render json: user

  end 

  def delete
    user = current_user
    customer = Stripe::Customer.retrieve(user.stripeid)
    subscription_id = customer.subscriptions.first.id
    subscription = customer.subscriptions.retrieve(subscription_id).delete
    user.subscribed = "basic"
    user.save
    render json: user
  end

end