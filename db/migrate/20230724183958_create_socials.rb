class CreateSocials < ActiveRecord::Migration[7.0]
  def change
    create_table :socials do |t|
      t.string :site
      t.string :link

      t.timestamps
    end
  end
end
