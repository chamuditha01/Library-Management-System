import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';



interface AddBookProps {
  onAddBook: (book: { title: string; author: string; description: string }) => void;
}
const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && author && description) {
      onAddBook({ title, author, description });
      setTitle("");
      setAuthor("");
      setDescription("");
    }
  };
  


  return (
    <div>
      <h1 className="h1">Add a Book</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>

        <label htmlFor="author">
          Author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>

        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>

        <button
          type="submit"
          disabled={!title || !author || !description}
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
