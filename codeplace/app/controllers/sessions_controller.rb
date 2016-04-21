 class SessionsController < Devise::SessionsController

  def create
    user = warden.authenticate!(auth_options)
    token = Tiddle.create_and_return_token(user, request)
    render json: { authentication_token: token, user: current_user }
  end

  def destroy
    Tiddle.expire_token(current_user, request) if current_user
    respond_with sign_out
  end

  private

  # this is invoked before destroy and we have to override it
  def verify_signed_out_user
  end
  
end