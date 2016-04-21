class PlansController < ApplicationController

  #before_filter :authenticate_user!

  def create
    plan = Stripe::Plan.create(
      :amount => params[:amount],#2000,
      :interval => params[:interval],#"month",
      :name => params[:name],#,"Amazing Gold Plan",
      :currency => params[:currency],#"usd",
      :id => params[:id],#"gold"
    )

    render json: plan
  end

  def delete
    plan = Stripe::Plan.retrieve(params[:plan_id])
    plan.delete

    render json: plan
  end


end