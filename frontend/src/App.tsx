import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <>
      <h1>All Books</h1>
      <div className="card">
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.name}</h2>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
