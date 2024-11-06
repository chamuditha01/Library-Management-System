import { useState } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [redirectTo, setRedirectTo] = useState<string | null>(null); // State to control redirection
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage('');
    setErrorMessage('');

    if (isLogin) {
      // Login validation
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

      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }

          // Perform login logic (API call)
          try {
           
            const response = await fetch("https://localhost:5000/api/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });
            console.log(email, password);
          
            if (response.ok) {
              // Login successful, parse response if needed
              const data = await response.json();
              console.log("Login success:", data);
          
              // Redirect to the dashboard
              window.location.href = "/dashboard";
            } else {
              // Handle login failure
              const errorData = await response.json();
              setErrorMessage(errorData.message || "Login failed. Please check your credentials and try again.");
            }
          } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
              setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
            } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
            }
          }          
}
 else {
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
  
      try {
        const response = await fetch("https://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name, // Include name if required by your backend
          }),
        });
      
        const data = await response.json();  // Parse response data
      
        if (!response.ok) {
          // If the response is not ok, throw an error with the response message
          throw new Error(data.message || "Failed to sign up");
        }
      
        // If sign-up is successful
        setSuccessMessage("User created successfully! Please log in.");
        window.location.reload();  // Reload the page to clear the form
      
      } catch (error) {
        // Handle errors and display the error message
        console.error("Sign-up error:", error);
        if (error instanceof Error) {
          setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
      
    }
  };

  return (
    <div className="login-box">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form>
        <div></div>
        <div id="user-box1">
          <input
            value={email}
            placeholder="Enter Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"user-box1"}
            type="text"
          />
          <label style={{ color: "blue" }} className="errorLabel">
            {emailError}
          </label>
        </div>
        <div id="user-box1">
          <input
            value={password}
            placeholder="Enter password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"user-box"}
            type="password"
          />
          <label style={{ color: "blue" }} className="errorLabel">
            {passwordError}
          </label>
        </div>
        {!isLogin && (
          <div>
            <div id="user-box1">
              <input
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                className={"user-box"}
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
                className={"user-box"}
                type="text"
              />
            </div>
          </div>
        )}
        <input
          onClick={onButtonClick}
          className={"inputButton"}
          type="button"
          value={isLogin ? "Login" : "Sign Up"}
        />
      </form>

      <div className="toggleForm">
        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ color: "blue", cursor: "pointer" }} // Set desired color and pointer cursor
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
      {successMessage && <div className="success" style={{color:'blue'}}>{successMessage}</div>}
    {errorMessage && <div className="error" style={{color:'blue'}}>{errorMessage}</div>}
      <GoogleOAuthProvider clientId="1029470847404-g13c12gjvlhlhb4dk0tjo2jgs4rlmc02.apps.googleusercontent.com">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      console.log("Google login successful:", credentialResponse);
      
      // Retrieve the ID token
      const idToken = credentialResponse.credential;

      // Send token to backend for verification
      try {
        

        const response = await fetch('https://localhost:5000/api/auth/google', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: idToken }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with backend');
        }

        const data = await response.json();
        console.log("Login successful:", data);
        console.log("Google login successful:", credentialResponse);
        console.log("ID Token:", credentialResponse.credential);  // The ID token should be in `credential`
        
        // You can then redirect or set user session data here
        // Example: setRedirectTo("/dashboard");
      } catch (error) {
        console.error("Google login error:", error);
      }
    }}
    onError={() => {
      console.log("Google Login Failed");
    }}
  />
</GoogleOAuthProvider>

    </div>
  );
}

export default Login;
