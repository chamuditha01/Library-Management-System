import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./dt.css";
import { GiClick } from "react-icons/gi";
import { IoLibrarySharp } from "react-icons/io5";
import { MdLocalLibrary } from "react-icons/md";
import { TbWorldUpload } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import AddBook from "./AddBookForm";
import ViewBooks from "./ViewBook";
import UpdateBooks from "./UpdateBook";
import DeleteBooks from "./DeleteBooks";


function Home() {
  // Set 'View Books' as the default popupOpen state
  const [popupOpen, setPopupOpen] = useState<string | null>("View Books");

  const togglePopup = (popupType: string) => {
    // Toggle the popup only if it's different from the current one
    if (popupType !== popupOpen) {
      setPopupOpen(popupType);
    }
  };

  const onAddBook = () => {
    // Define the onAddBook function logic here
    console.log("Book added");
  };

  return (
    <main className={`main-container dark-mode : 'light-mode'}`}>
      <div>
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          Library Management System
        </h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <a
              href="#"
              className="h3"
              onClick={() => togglePopup("View Books")}
            >
              View Books{" "}
            </a>
            <IoLibrarySharp className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <a href="#" className="h3" onClick={() => togglePopup("Add Book")}>
              Add Books <GiClick className="card_icon" />
            </a>
            <MdLocalLibrary className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <a
              href="#"
              className="h3"
              onClick={() => togglePopup("Update Books")}
            >
              Update Books <GiClick className="card_icon" />
            </a>
            <TbWorldUpload className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <a
              href="#"
              className="h3"
              onClick={() => togglePopup("Delete Books")}
            >
              Delete Books <GiClick className="card_icon" />
            </a>
            <MdDeleteSweep className="card_icon" />
          </div>
        </div>
      </div>

      {/* Render the appropriate popup based on the state */}
      {popupOpen === "Add Book" && <AddBook onAddBook={onAddBook} />}
      {popupOpen === "View Books" && <ViewBooks />}
      {popupOpen === "Update Books" && <UpdateBooks />}
      {popupOpen === "Delete Books" && <DeleteBooks />}
    </main>
  );
}

export default Home;
