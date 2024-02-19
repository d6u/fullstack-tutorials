import { useEffect, useState } from "react";

type Book = {
  id: number;
  name: string;
  description: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <h1>All Books</h1>
      <div>
        <input
          type="text"
          placeholder="Search a book"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetch(`http://localhost:3000/books?q=${searchQuery}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                setBooks(data);
              });
          }}
        >
          Search
        </button>
      </div>
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
