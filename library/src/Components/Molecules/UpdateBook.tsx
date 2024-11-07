import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

interface Book {
  bookId: number;
  title: string;
  author: string;
  description: string;
}

const UpdateBooks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/books"); // Api call for fetching all books
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

  const handleEditClick = (book: Book) => {
    setEditingRow(book.bookId); // Set the editing row to the clicked book's id
    setUpdatedBook({ ...book }); // Initialize updatedBook with the current book data
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedBook) {
      const { name, value } = e.target;
      setUpdatedBook({
        ...updatedBook,
        [name]: value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (updatedBook) {
      try {
        // Send PUT request to update the book in the API
        const response = await fetch(
          `https://localhost:5000/api/books/${updatedBook.bookId}`,
          {
            // Api call for updating a book by ID
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update book");
        }

        // Update the book in the local state correctly
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
          )
        );
        setEditingRow(null); // Reset editing row
        setUpdatedBook(null); // Clear updated book data
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-table-content">
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover"
          style={{ margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Book No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the edit row if a book is being edited */}
            {editingRow && updatedBook && (
              <tr>
                <td>{updatedBook.bookId}</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={updatedBook.title}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="author"
                    value={updatedBook.author}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={updatedBook.description}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleSaveClick}>
                    Save
                  </button>
                </td>
              </tr>
            )}
            {/* Render the book rows */}
            {books.map(
              (
                book // Mapping fetched books
              ) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleEditClick(book)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateBooks;
