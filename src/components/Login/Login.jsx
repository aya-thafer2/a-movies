import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import style from "./Login.module.css";
import CustomInput from "../common/CustomInput";

const Login = ({setLogUser}) => {
  // let apiURL=`https://www.themoviedb.org/authenticate/` + token;
    const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState([]);

  const registerSchema = Joi.object({
    email: Joi.string().required().messages({
      "string.pattern.base": '"value" is not allowed to be empty',
      "string.empty": "Email is not allowed to be empty",
    }),
    password: Joi.string().required().messages({
      "string.pattern.base": '"value" is not allowed to be empty',
      "string.empty": "Password is not allowed to be empty",
    }),
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name));
    if (validation.error) {
      console.log(validation);
      setErrors({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    setUser({ ...user, [name]: value });
  };

  //   const onChange = (e) => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  // };

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validation = validateUser();
    const errorsList = [];

    if (validation.error) {
      validation.error.details.map((err) => {
        errorsList.push(err.message);
      });
      setLoginErrors(errorsList);
    } else {
      setLoginErrors([]);
      const result = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        user
      );
      if (result.data.message === "success") {
        const expires = new Date();
        const futureDay = expires.getDate() + 1;
        expires.setDate(futureDay);
        cookie.save("token", result.data.token, { expires });
        setLogUser(result.data.token);
        // window.open(`https://www.themoviedb.org/authenticate/${token}`, '_blank');
        navigate('/');
      } else {
        result.data.err.map((err) => {
          errorsList.push(err[0].message);
          setLoginErrors(errorsList);
        });
      }
    }
  };
  
  

  return (
    <div className={`container text-center my-5`}>
      <div className="user my-3">
        <h4 className="login">Login</h4>
      </div>
      <div className={`card login p-5 w-50 m-auto`}>
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          {loginErrors.map((error, index) => (
            <div className="alert alert-danger" role="alert" key={index}>
              {error}
            </div>
          ))}
          <CustomInput
            error={errors.email}
            name="email"
            onChange={onChange}
            text="Enter Your Email"
            type="text"
          />
          <CustomInput
            error={errors.password}
            name="password"
            onChange={onChange}
            text="Enter Your Password"
            type="password"
          />
          {Object.keys(errors).length > 0 &&
          (errors.email !== "" || errors.password !== "") ? (
            <button className="btn btn-dark my-4 w-100 rounded-5" disabled={true}>
              Login
            </button>
          ) : (

            <button
              className="btn btn-dark my-4 w-100 rounded-5"
              disabled={false}
            >
              Login
            </button>

            
          )}
          <p>
            <Link className={`${style.forgot} text-muted btn`} to='/forget-password'>
              I Forgot My Password
            </Link>
          </p>
          <Link className="btn btn-dark rounded-5" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
