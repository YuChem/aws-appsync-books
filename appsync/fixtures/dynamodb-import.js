const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: "us-east-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const { books, authors } = JSON.parse(fs.readFileSync('books-authors.json'));

books.forEach((book) => {
  const params = {
    TableName: "books",
    Item: {
      "id": book.id,
      "title": book.title,
      "ISBN": book.ISBN,
      "yearPublished": book.yearPublished,
      "authors": book.authors
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add book", book.id, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: ", book.id);
    }
  });
});

authors.forEach((author) => {
  const params = {
    TableName: "authors",
    Item: {
      "id": author.id,
      "name": author.name,
      "bornYear": author.bornYear,
      "bornCountry": author.bornCountry
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add author", author.id, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", author.id);
    }
  });
});
