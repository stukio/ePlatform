class Course < ActiveRecord::Base
	has_many :chapters, :dependent => :destroy
	mount_uploader :thumbnail, ImageUploader
end
