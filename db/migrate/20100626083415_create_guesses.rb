class CreateGuesses < ActiveRecord::Migration
  def self.up
    create_table :guesses do |t|
      t.string :name
      t.text :result
      t.string :short_url
      t.timestamps
    end
  end

  def self.down
    drop_table :guesses
  end
end
