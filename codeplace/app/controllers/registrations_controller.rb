class RegistrationsController < Devise::RegistrationsController

  private
 
  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
  end
 
  def account_update_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :current_password, :avatar)
  end
  
  # Allow update resource without password confirmation
  def update_resource(resource, params)
      resource.update_without_password(params)
  end
   


end