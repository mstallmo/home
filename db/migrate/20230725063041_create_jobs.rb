class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
