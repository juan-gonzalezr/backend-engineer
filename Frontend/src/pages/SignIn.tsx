import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
import { Link } from "react-router-dom";
interface IFormInput {
  email: string;
  password: string;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const {signIn}=useAuth()

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });


  return (
    <div className="signup-container">
      <h1>Sign in</h1>
      <form className="signup-form" onSubmit={onSubmit}>
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
          Sign in
        </button>
      </form>
      <p>Don't have an account? <Link to='/sign-up'>sign up</Link></p>
    </div>
  );
};

export default SignIn;
