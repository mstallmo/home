class AddHomepageOptionToImages < ActiveRecord::Migration[7.0]
  def change
    change_table :images do |t|
      t.boolean :homepage, default: false, null: false
    end
  end
end
