import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UploadImages from "./components/UploadImages";
import Cookies from "js-cookie";

const App = () => {
  // Function to retrieve email and password from browser cookies
  const getEmailFromCookies = () => {
    // Implement logic to retrieve email and password from cookies
    const email = Cookies.get("email");
    return { email };
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Pass email and password props to Welcome component */}
          <Route
            path="/uploadimages"
            element={<UploadImages {...getEmailFromCookies()} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
