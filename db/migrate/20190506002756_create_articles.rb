class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :source
      t.string :author
      t.string :title
      t.text :description
      t.string :url
      t.string :urlToImage
      t.string :publishedAt
      t.text :content
      t.string :category

      t.timestamps
    end
  end
end
