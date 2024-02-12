import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const url =
        "http://localhost:8080/api/v1/login/" + email + "/" + password;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        Cookies.set("email", email);
        Cookies.set("password", password);
        navigate("/UploadImages");
      } else {
        alert("Either Email id or Password is incorrect" + response);
        console.error("Either Email id or Password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white shadow-lg border p-8">
        <h2 className="text-3xl font-semibold mb-4">Sign in to your account</h2>
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
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <p className="mt-2">
            Don't Have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
