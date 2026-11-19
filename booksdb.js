// Small local sample catalogue so the API can be tested without a database.
const books = {
  '1': {
    isbn: '1',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    reviews: {}
  },
  '2': {
    isbn: '2',
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    reviews: {}
  },
  '3': {
    isbn: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    reviews: {}
  }
};

module.exports = { books };
