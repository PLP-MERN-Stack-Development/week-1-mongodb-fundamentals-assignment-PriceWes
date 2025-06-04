
// Use the correct database
use plp_bookstore;


// 1. Find all books in a specific genre (e.g., 'Science Fiction')
db.books.find(
  { genre: "Science Fiction" }
);

// 2. Find books published after a certain year (e.g., after 2015)
db.books.find(
  { published_year: { $gt: 2015 } }
);

// 3. Find books by a specific author (e.g., 'Isaac Asimov')
db.books.find(
  { author: "Isaac Asimov" }
);

// 4. Update the price of a specific book (e.g., title: 'Dune')
db.books.updateOne(
  { title: "Dune" },
  { $set: { price: 19.99 } }
);

// 5. Delete a book by its title (e.g., 'Old Book')
db.books.deleteOne(
  { title: "Old Book" }
);

// 6. Find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
);

// 7. Use projection to return only the title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 8. Sort books by price ascending
db.books.find().sort({ price: 1 });

// 9. Sort books by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination: limit to 5 books per page, skip first 5 (page 2)
db.books.find().skip(5).limit(5);


// 11. Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
        "s"
      ] },
      count: { $sum: 1 }
    }
  }
]);


// 14. Create an index on the title field
db.books.createIndex({ title: 1 });

// 15. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 16. Use explain() to demonstrate performance improvement
db.books.find({ title: "Dune" }).explain("executionStats");
db.books.find({ author: "Isaac Asimov", published_year: 1951 }).explain("executionStats");

