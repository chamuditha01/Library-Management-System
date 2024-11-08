import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { MdLocalLibrary } from "react-icons/md";

interface AddBookProps {
  onAddBook: (book: {
    title: string;
    author: string;
    description: string;
    userId: number;
  }) => void;
}

const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState<boolean>(false); // Manage loading state
  const [error, setError] = useState<string>(""); // Manage error state
  const [successMessage, setSuccessMessage] = useState<string>(""); // Manage success message

  // Get userId from localStorage and convert to number
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null; // Convert to number if available, else null

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure userId is a valid number before submitting
    if (userId === null) {
      setError("User ID is missing or invalid.");
      return;
    }

    const bookData = {
      title, // Should be a non-empty string
      author, // Should be a non-empty string
      description, // Should be a non-empty string
      userId, // Ensure userId is an integer
    };

    console.log("Submitting book:", bookData);
    setLoading(true); // Set loading to true
    setSuccessMessage(""); // Clear previous success message
    setError(""); // Clear previous error message

    try {
      const response = await fetch("https://localhost:5000/api/books", {
        // API call for adding a book
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData), // Convert bookData to JSON string before sending
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle successful response...
      onAddBook(bookData); // Optional: Call onAddBook prop if you want to update the parent component state

      // Clear input fields
      setTitle("");
      setAuthor("");
      setDescription("");

      // Set success message
      setSuccessMessage("Book added successfully!");
    } catch (error) {
      console.error("Error submitting book:", error);
      setError("Failed to add book. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div>
      
      <MdLocalLibrary size={140} color="#54473F"/>  
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="title" style={{color:'black'}}>
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
        <label htmlFor="author" style={{color:'black'}}>
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
        <label htmlFor="description" style={{color:'black'}}>
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
          disabled={loading || !title || !author || !description}
          style={{
            padding: "10px",
            backgroundColor: "#54473F",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
        {error && <div className="text-danger">{error}</div>}{" "}
        {/* Display error message */}
        {successMessage && (
          <div className="text-success">{successMessage}</div> 
        )}{" "}
        {/* Display success message */}
      </form>
    </div>
  );
};

export default AddBook;
