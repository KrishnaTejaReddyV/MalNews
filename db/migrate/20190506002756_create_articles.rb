class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :source
      t.string :author
      t.string :title
      t.text :description
      t.string :url
      t.string :url_to_image
      t.datetime :published_at
      t.text :content
      t.string :category

      t.timestamps
    end
  end
end
