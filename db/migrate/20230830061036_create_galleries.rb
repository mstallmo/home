class CreateGalleries < ActiveRecord::Migration[7.0]
  def change
    create_table :galleries do |t|
      t.string :name
      t.boolean :published, null: false, default: false

      t.timestamps
    end
  end
end
