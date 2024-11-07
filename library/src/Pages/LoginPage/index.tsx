import { useState } from "react";
import "./index.css";
import { jwtDecode } from "jwt-decode";
import imglogin from "../../Assets/Images/librarydb.webp";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");
    setErrorMessage("");
    

    if (isLogin) {
      // Login validation
      if (email === "") { // Email validation
        setEmailError("Please enter your email");
        return;
      }

      if (password === "") { // Password validation
        setPasswordError("Please enter a password");
        return;
      }

      if (password.length < 8) { // Password length validation
        setPasswordError("Password must be 8 characters or longer");
        return;
      }

      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { // Regular expression for email validation
        setEmailError("Please enter a valid email address");
        return;
      }
      

      // Perform login logic 
      try {
        
        const response = await fetch("https://localhost:5000/api/users/login", { //API call for login
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        setLoading(true); // Set loading to true
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const decodedToken: any = jwtDecode(token); // Decode the token to get the userId
          const userId = decodedToken.userId;
          localStorage.setItem("userId", userId); // Store the userId in local storage
          localStorage.setItem("token", token); // Store the token in local storage
          window.location.href = "/dashboard"; // Redirect to the dashboard
        } else {
          const errorData = await response.json();
          setLoading(false); // Set loading back to false
          setErrorMessage(
            errorData.message ||
              "Login failed. Please check your credentials and try again."
              
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
        setLoading(false); // Set loading back to false
      }
    } else {
      // Handle signup logic
      if (email === "") {
        setEmailError("Please enter your email");
        return;
      }

      if (password === "") {
        setPasswordError("Please enter a password");
        return;
      }

      if (password.length < 8) {
        setPasswordError("Password must be 8 characters or longer");
        return;
      }

      if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }

      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      setLoading(true); 
      try {
        const response = await fetch("https://localhost:5000/api/users", {//API call for signup
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setLoading(false); 
          throw new Error(data.message || "Failed to sign up");
        }

        setSuccessMessage("User created successfully! Please log in.");
        window.location.reload();
      } catch (error) {
        setLoading(false); 
        console.error("Sign-up error:", error);
        setErrorMessage("An unexpected error occurred. Please try again. Try Using another email");
      }
    }
  };

  return (
    <div className="login-box">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <form>
            <img style={{width:'100%',height:"80%",marginLeft:'5%',marginTop:'-30px'}} src={imglogin} alt="Avatar" className="avatar" />
          <div id="user-box1">
            <input
              value={email}
              placeholder="Enter Email"
              onChange={(ev) => setEmail(ev.target.value)}
              className="user-box1"
              type="text"
            />
            <label style={{ color: "blue" }} className="errorLabel">
              {emailError}
            </label>
          </div>
          <div id="user-box1">
            <input
              value={password}
              placeholder="Enter Password"
              onChange={(ev) => setPassword(ev.target.value)}
              className="user-box"
              type="password"
            />
            <label style={{ color: "blue" }} className="errorLabel">
              {passwordError}
            </label>
          </div>
          {!isLogin && (
            <>
              <div id="user-box1">
                <input
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                  className="user-box"
                  type="password"
                />
                <label style={{ color: "blue" }} className="errorLabel">
                  {confirmPasswordError}
                </label>
              </div>
              <div id="user-box1">
                <input
                  value={name}
                  placeholder="Enter Name"
                  onChange={(ev) => setName(ev.target.value)}
                  className="user-box"
                  type="text"
                />
              </div>
            </>
          )}
          <input
            onClick={onButtonClick}
            className="inputButton"
            type="button"
            value={isLogin ? "Login" : "Sign Up"}
          />
        </form>
      )}
      <div className="toggleForm">
        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
      {successMessage && (
        <div className="success" style={{ color: "blue" }}>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error" style={{ color: "blue" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Login;
