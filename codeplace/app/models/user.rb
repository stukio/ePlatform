class User < ActiveRecord::Base
  mount_uploader :avatar, ImageUploader  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  has_many :authentication_tokens

  has_many :progresses




end