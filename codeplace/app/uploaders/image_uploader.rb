# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  # Choose what kind of storage to use for this uploader:
   storage :aws
  # storage :aws

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end


  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
