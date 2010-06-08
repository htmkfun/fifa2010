class CreateGuessResult < ActiveRecord::Migration
  def self.up
    create_table :guess_result, :force => true do |t|
      t.string  :token
      t.timestamps
    end
  end

  def self.down
    drop_table :guess_result
  end
end
