class CreateProgresses < ActiveRecord::Migration
  def change
    create_table :progresses do |t|
      t.integer :user_id
      t.integer :chapter_id

      t.timestamps null: false
    end

    add_index :progresses, :user_id
    add_index :progresses, :chapter_id
  end
end
