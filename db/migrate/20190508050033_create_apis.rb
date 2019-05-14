class CreateApis < ActiveRecord::Migration[5.2]
  def change
    create_table :apis do |t|
      t.string :last_requested_date
      t.string :key

      t.timestamps
    end
  end
end
