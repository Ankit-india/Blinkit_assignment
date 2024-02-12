import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const url =
        "http://localhost:8080/api/v1/signup/" + email + "/" + password;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });


      if (response.ok) {
        Cookies.set("email", email);
        Cookies.set("password", password);
        navigate("/");
      } else {
        alert("Either Email id or Password is invalid" + response);
        console.error("Sign up failed");
      }
    } catch (error) {
      alert("Either Email id or Password is invalid" + error);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg border p-8">
        <h2 className="text-3xl font-semibold mb-4">Create a new account</h2>
        <div className="w-full max-w-sm">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full max-w-sm mt-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
          {isLoading ? (
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          )}
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
