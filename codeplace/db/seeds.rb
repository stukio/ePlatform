(1..10).each_with_index do |u, index|
	user = Course.create! :name => 'Course-' + index.to_s, :description => 'This is the description from the course!', :thumbnail => 'http://www.doylehealthandsafety.ie/images/training_image.jpg'
end

puts "Success!! - Courses"

(1..3).each_with_index do |u, index|
	user = User.create! :username => 'User' + index.to_s, :email => index.to_s + "@gmail.com", :password => "password", :password_confirmation => "password", :avatar => "http://www.iconarchive.com/download/i59027/hopstarter/superhero-avatar/Avengers-Nick-Fury.ico"
end

puts "Success!! - Users"



