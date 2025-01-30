import React, { useState } from "react";
import FormInput from "../components/FormInput";
import axiosInstance from "../utils/auth/AxiosInstance";
import { LoginResponse } from "../types/dto";

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      // Here you can implement actual login logic, for now just reset the error message.
      setErrorMessage("");
      console.log("Username:", username);
      console.log("Password:", password);
      // Add your authentication API call here
      try {
        const response = await axiosInstance.post<LoginResponse>(
          "/auth/login",
          {
            username,
            password,
          }
        );
        console.log("Response :", response);
        if (response.data.data.accessToken && response.data.data.refreshToken) {
          // Save the access and refresh tokens in localStorage or sessionStorage
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);

          // Redirect to a protected page or dashboard (Optional)
          window.location.href = "/admin/dashboard"; // Modify with your actual route
        } else {
          setErrorMessage("Failed to retrieve tokens.");
        }
      } catch (error) {
        // Handle errors (network issues, invalid credentials, etc.)
        setErrorMessage(
          "Login failed. Please check your credentials and try again."
        );
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            labelFor="username"
            inputType="username"
            inputId="username"
            inputName="username"
            inputLabel="Username"
            placeholderText="Enter your username"
            onChange={handleUsernameChange}
            required
          />
          <div className="my-4"></div>
          <FormInput
            labelFor="password"
            inputType="password"
            inputId="password"
            inputName="password"
            inputLabel="Password"
            placeholderText="Enter your password"
            onChange={handlePasswordChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
