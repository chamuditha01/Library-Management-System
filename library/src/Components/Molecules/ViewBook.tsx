import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Book {
  bookId: number; // Assuming you have a property for the book ID
  title: string;
  author: string; // Corrected from "Auther" to "author"
  description: string; // Corrected from "Discription" to "description"
}

const ViewBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the books data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/books"); // Adjust the URL according to your API
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchBooks(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching
  }

  return (
    <div>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover" style={{ margin: '0 auto' }}>
            <thead className="thead-dark">
              <tr>
                <th>Book No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
