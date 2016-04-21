class AddStripeToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :subscribed, :string, default: "basic"
    add_column :users, :stripeid, :string
  end
end



