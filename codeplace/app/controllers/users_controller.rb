class UsersController < ApplicationController
  before_filter :authenticate_user!, :except => [:reset_password]
  
  def my_current_user
    render json: current_user
  end
  def update_user
   @user = User.find(params[:id])
     if @user.update(user_params)
       head :no_content
     else
       render json: @user.errors, status: :unprocessable_entity
     end
  end

  def subscribers
  	@users = User.where.not(subscribed: false).count
  	render json: @users
  end

  def all_users
  	@users = User.all.count
  	render json: @users
  end

  def reset_password
    @user = User.find_by_email(params[:user_email])
    @user.send_reset_password_instructions
    render json: @user
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :avatar)
  end

end