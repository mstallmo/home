class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.string :link
      t.string :label

      t.timestamps
    end
  end
end
