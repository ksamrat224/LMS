import Input from "../components/Input";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Login = () => {
  const[errorMessage,setErrorMessage]= useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await axios(`${BASE_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: formValues,
      });
      console.log(response.data);
    } catch (error: any) {
      // Set the error message in case of an error
      setErrorMessage(error.response?.data?.message || "LogIn failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          Login to Your Account
        </h1>
        {/* Display error message if it exists */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <Input name="username" type="username" id="username" label="email" />
          <Input
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          <Button
            label="Login"
            type="submit"
            bgColor="bg-blue-600 hover:bg-blue-700"
          />
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
