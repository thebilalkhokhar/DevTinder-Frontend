import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOGIN HANDLER
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      if (
        (typeof res.data === "string" &&
          res.data.toLowerCase().includes("credentials are not valid")) ||
        (res.data && res.data.error)
      ) {
        setError(res.data.error || "Credentials are not valid!");
        return;
      }

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };

  // SIGNUP HANDLER
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center my-30">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body bg-base-200">
          {/* Title */}
          <h2 className="card-title justify-center text-2xl mb-5">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* Toggle */}
          <div className="flex justify-center mb-4 gap-3">
            <button
              className={`btn btn-sm ${isLogin ? "btn-primary" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`btn btn-sm ${!isLogin ? "btn-primary" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit}>
            {/* First & Last Name only in Signup */}
            {!isLogin && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jonny."
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sins"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="mail@site.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            <p className="text-red-500">{error}</p>

            {/* Submit Button */}
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-primary" type="submit">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
