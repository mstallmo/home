class AddPublishedStatusToArticles < ActiveRecord::Migration[7.0]
  def change
    change_table :articles, bulk: true do |t|
      t.string :publish_status, default: "draft", null: false
      t.timestamp :published_at
    end
  end
end
