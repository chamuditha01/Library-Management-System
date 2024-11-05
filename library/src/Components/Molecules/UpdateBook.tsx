import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const UpdateBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "groom", author: "Richard", description: "heading to north america" },
  ]);

  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  const handleEditClick = (book: Book) => {
    setEditingRow(book.id);
    setUpdatedBook({ ...book });
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

  const handleSaveClick = () => {
    if (updatedBook) {
      setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
      setEditingRow(null);
      setUpdatedBook(null);
    }
  };

  return (
    <div className="center-table-content">
      <div className="table-responsive">
      <table className="table table-bordered table-hover" style={{margin:'0 auto'}}>
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
            {/* Render the edit row at the top if a row is being edited */}
            {editingRow && updatedBook && (
              <tr>
                <td>{updatedBook.id}</td>
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
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <button className="btn btn-outline-success" onClick={() => handleEditClick(book)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateBooks;
