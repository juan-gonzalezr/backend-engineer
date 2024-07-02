import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
import "../styles/pages/signUp.styled.css"; // Asegúrate de importar el archivo CSS
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { signUp, isAuthenticated ,errors:SignUpErrors } = useAuth();
  const navigate=useNavigate()

  useEffect(()=>{
    if(isAuthenticated) navigate('/restaurants')
  })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    signUp(data);
    console.log(data);
  };

  return (
    <div className="signup-container">       
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <p> <Link to='/sign-in'>Sign in</Link></p>
    </div>
  );
};

export default SignUp;
