class ChangePublishedTypeInComments < ActiveRecord::Migration[5.2]
  def change
    connection.execute("PRAGMA defer_foreign_keys = ON")
    connection.execute("PRAGMA foreign_keys = OFF")
    change_column :comments, :published_at, :datetime
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA defer_foreign_keys = OFF")
  end
end
