class DeleteArticleData < ActiveRecord::Migration[5.2]
  def change
    connection.execute("PRAGMA defer_foreign_keys = ON")
    connection.execute("PRAGMA foreign_keys = OFF")
    connection.execute("delete from articles")
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA defer_foreign_keys = OFF")
  end
end
