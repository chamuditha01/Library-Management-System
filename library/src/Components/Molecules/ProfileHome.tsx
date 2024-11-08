import React, { useState, useEffect } from "react";
import "./index.css"; // CSS for styling the component

interface User {
  userId: Number;
  id: string;
  name: string;
  email: string;
}

const ProfileHome = () => {
  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found in local storage");
      setLoading(false);
      return;
    }
    console.log("User ID:", userId);

    // Define the API endpoint with the user ID
    const url = `https://localhost:5000/api/users/${userId}`; // API endpoint for fetching user data

    // Fetch user data for the specified user ID
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const ptagcss = {
    margin: "10px",
    color: "white",
  };
  return (
    <main className={`main-container dark-mode : 'light-mode'}`} style={{ background: "linear-gradient(135deg, #FFF8DE, #C5D3E8)" }}>
      <div className="profile-container" style={{ marginTop: "20px" }}>
        <h2 style={ptagcss}>User Profile</h2>
        {user && (
          <div className="profile-details">
            <p style={ptagcss}>
              <strong>ID:</strong> {user.userId.toString()}
            </p>
            <p style={ptagcss}>
              <strong>Name:</strong> {user.name}
            </p>
            <p style={ptagcss}>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileHome;
