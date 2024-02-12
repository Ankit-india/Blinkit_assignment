import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UploadImagesProps {
  email: any;
}

const UploadImages: React.FC<UploadImagesProps> = ({ email }) => {
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogOut = async () => {
    setLogoutLoading(true);

    try {
      const url = "http://localhost:8080/api/v1/logout/" + email;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUploadButtonClick = async () => {
    console.log(selectedFile?.name);

    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("images", selectedFile);

      const url = "http://localhost:8080/api/v1/uploadImages/" + email;
      const response = await fetch(url, {
        // Adjusted endpoint
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Images uploaded successfully!");
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="upload-images-container flex flex-col items-center">
        <button
          className="logout-button text-blue-500 text-2xl mb-4"
          onClick={handleLogOut}
          disabled={logoutLoading}
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
        <div className="flex flex-col items-center mt-4">
          <label htmlFor="fileInput" className="upload-label">
            Choose an image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
            className="text-green-600 text-lg mt-2 bg-yellow-300 py-1 px-2 rounded-xl cursor-pointer"
            disabled={uploadLoading}
            multiple
          />
          <button
            onClick={handleUploadButtonClick}
            disabled={!selectedFile || uploadLoading}
            className="text-white bg-blue-500 rounded px-4 py-2 mt-2"
          >
            {uploadLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {uploadLoading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center">
            <div className="text-green-500 text-5xl">Uploading images...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImages;
