class ChangeArticleColNames < ActiveRecord::Migration[5.2]
  def change
    connection.execute("PRAGMA defer_foreign_keys = ON")
    connection.execute("PRAGMA foreign_keys = OFF")
    rename_column :articles, :urlToImage, :url_to_image
    rename_column :articles, :publishedAt, :published_at
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA defer_foreign_keys = OFF")
  end
end
