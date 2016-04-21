CarrierWave.configure do |config|

  config.storage    = :aws
  config.aws_bucket = ENV['AWS_BUCKET']
  config.aws_acl    = 'public-read'

  config.aws_credentials = {
    access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    region:            ENV['AWS_REGION'] # Required
  }



end