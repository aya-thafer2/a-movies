import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    code: "",
    newPassword: "",
  });

  const { email } = useParams();
  console.log(email);

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await axios.patch(
      `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword`,
      { ...inputFields, email }
    );
    if(result.data.message === "success") {
        toast.success('Changed Password Successfully!');
        navigate('/login');
    }else if(result.data.message === "fail") {
        toast.error('Please Enter The Correct Code!');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
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
            className="form-control mb-3"
            placeholder="Please Enter The Code"
            type="text"
            name="code"
            value={inputFields.code}
          />
          <input
            onChange={onChange}
            className="form-control"
            placeholder="Please Enter The New Password"
            type="password"
            name="newPassword"
            value={inputFields.newPassword}
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

export default ResetPassword;
