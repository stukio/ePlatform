class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|

      t.integer :course_id
      t.string  :name
      t.string  :description
      t.string  :video_url
      t.boolean :completed, default: "false"

      t.timestamps null: false
    end

    add_index :chapters, :created_at
  end
end



