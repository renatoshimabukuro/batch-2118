- What’s a relational database?

```
Series of tables with relations to another
```

- What are the different “table relationships” you know?

```
one to many
many to many
one to one
```

- What’s the language to make queries to a database?

```
SQL
```

- What’s the SQL query to get books written before 1985?

```sql
SELECT * FROM books WHERE publishing_year < 1985;
```

- What’s the SQL query to get the 3 most recent books written by Jules Verne?

```sql
SELECT * FROM books JOIN authors ON books.author_id = authors.id WHERE authors.name = 'Jules Verne' ORDER BY books.publishing_year DESC LIMIT 3;
```

- What’s the purpose of Active Record?

```
Easily manage database info.

The purpose is to allow you to represent data from a relational database as Ruby objects within an app. Then you can do actions like saving records or updating records by calling Ruby methods on those objects. You don’t have to manually write SQL queries and instead can use simple Ruby methods, which saves time and makes the code easier to handle.
```

- What’s a migration?

```
A process through which changes are made to the database structure/schema, such as adding or dropping tables or adding or removing columns.
```

- How do you run a migration?

```

rake db:migrate

```

- Complete the following migrations to create your e-library database.

```ruby
class CreateAuthors < ActiveRecord::Migration[7.0]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end

````

- Complete the following migrations to create your e-library database.

```ruby
class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.integer :publishing_year
      t.references :author, foreign_key: true

      t.timestamp
    end
  end
end
```

```ruby
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email

      t.timestamps
    end
  end
end

class CreateReadings < ActiveRecord::Migration[7.0]
  def change
    create_table :readings do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true
      t.date :date
    end
  end
end

# class ChangeDateToDatetimeInReadings < ActiveRecord::Migration[7.0]
#   def change
#     change_column :readings, :date, :datetime
#   end
# end

```

- Write a migration to add a category column to the books table.

```ruby
class AddCategoryToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :category, :string
  end
end
```

- Define each Active Record model with its associations for your database.
  Hint: We’re working with 4 tables: authors, books, users & readings. Therefore we need 4 models!

```ruby

class Author < ActiveRecord::Base
  has_many :books
end

class Book < ActiveRecord::Base
  belongs_to :author
  has_many :readings
  # Optional
  has_many :users, through: :readings
end

class User < ActiveRecord::Base
  has_many :readings
  # Optional
  has_many :books, through: :readings
end

class Reading < ActiveRecord::Base
  belongs_to :book
  belongs_to :user
end

scooter = User.first

# scooter.books => an array of Book instances that User Scooter have read
```

- Complete the following code using the relevant Active Record methods.

```ruby
#1. Add your favorite author to the DB
lovecraft = Author.new(name: "HP Lovecraft")
lovecraft.save

#2. Get all authors
authors = Author.all

#3. Get author with id=8
Author.find(8)

#4. Get author with name="Jules Verne", store it in a variable: jules
jules = Author.find_by(name: "Jules Verne")

#5. Get Jules Verne's books
jules.books

#6. Create a new book "20000 Leagues under the Seas". Store it in a variable: twenty_thousand
twenty_thousand = Book.new(title: "20000 Leagues under the Seas", publishing_year: 1870)

#7. Add Jules Verne as this book's author
twenty_thousand.author = jules

#8. Now save this book in the DB!
twenty_thousand.save
```

- Add validations of your choice to the Author class.

```ruby
class Author
  validates :name, uniqueness: true
  validates :name, presence: true
end
```
