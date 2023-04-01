import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const onChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  
  const submitForm = async (e) => {
      e.preventDefault();

      if (!email || email.length < 8) {
        toast.warning("Please enter a valid email!");
        return;
      }
    const result = await axios.patch(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode",
      { email }
    );
    toast.success('Please check your email!');
    navigate(`/reset-code/${email}`);
  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Forget Password</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          <input
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
          />
          <button
            className="btn btn-default-outline my-4 w-100 rounded"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
