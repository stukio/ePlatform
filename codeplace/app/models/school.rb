class School < ActiveRecord::Base
	has_many :plans
	mount_uploader :thumbnail, ImageUploader
end
