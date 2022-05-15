import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    let usersdata = localStorage.getItem("users");
    let registeredUsers = JSON.parse(usersdata);

    if (
      e.target.email.value !== undefined &&
      e.target.password.value !== undefined
    ) {
      const isValidUser = registeredUsers.filter(
        (user) => user.email === e.target.email.value
      );

      isValidUser.length > 0 &&
        localStorage.setItem("user", JSON.stringify(isValidUser[0].email));
      if (isValidUser.length > 0) {
        navigate("/");
      }
    }
  };
  return (
    <div className="login">
      <span className="loginTitle" style={{ color: "white" }}>
        Login
      </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          id="email"
          type="text"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="loginInput"
          id="password"
          type="password"
          placeholder="Enter your password..."
        />
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
}
