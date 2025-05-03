import React, { useState } from "react";
import { Link } from "react-router-dom";
import { countryList } from "../utils/countryList";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const validateField = (name, value) => {
    let newErrors = { ...errors };
  
    switch (name) {
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password =
            "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          newErrors.password =
            "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "Password must contain at least one number";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
          newErrors.password =
            "Password must contain at least one special character";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
  
    setErrors(newErrors);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validateField(name, value); 
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(values).forEach((field) => {
      validateField(field, values[field]);
    });
    
    if (Object.keys(errors).length === 0) {
      // Submit logic here
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="mt-[16px] px-12 py-8 flex items-center justify-center">
      <div className="bg-blue-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-white text-xl">Login</p>
        <div className="mt-4">

          <div className="mt-3">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-black p-2 outline-none"
              placeholder="email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <div className="text-white text-sm mt-1 min-h-[10px]">
              {errors.email}
            </div>
          )}

          <div className="mt-3 relative">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-2 bg-white text-black p-2 outline-none pr-10"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? < FaEye/> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <div className="text-white text-sm mt-1 min-h-[10px]">
              {errors.password}
            </div>
          )}


          <div className="mt-6">
            <button
              className="w-full bg-white text-black font-semibold py-2 rounded
                            hover:bg-zinc-100 transition-all duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <p className="text-white">
              Don't have an account?
              <Link to="/sign-up" className="text-white ml-1">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;