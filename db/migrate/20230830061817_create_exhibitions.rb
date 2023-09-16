class CreateExhibitions < ActiveRecord::Migration[7.0]
  def change
    create_table :exhibitions do |t|
      t.belongs_to :gallery
      t.belongs_to :image

      t.timestamps
    end
  end
end
