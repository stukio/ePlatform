class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|

      t.timestamps null: false
    end
  end
end
