import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  // const registerUrl =
  //   "https://niks-dd24b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let users = [];

    let registeredUsers = [];
    let usersdata = localStorage.getItem("users");
    e.preventDefault();
    console.log(e.target.email.value);

    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
      username: e.target.username.value,
    };

    if (JSON.parse(usersdata)?.length > 0) {
      registeredUsers = JSON.parse(usersdata);
      console.log(registeredUsers);
      registeredUsers.push(user);
      localStorage.setItem("users", JSON.stringify(registeredUsers));
      navigate("/login");
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    }

    //   // fetch(registerUrl, {
    //   //   method: "post",
    //   //   body: JSON.stringify(user),
    //   //   headers: {
    //   //     contentType: "application/json",
    //   //   },
    //   })
    // //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));
  };
  return (
    <div className="register">
      <span className="registerTitle" style={{ color: "white" }}>
        Register
      </span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          id="username"
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          id="email"
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          id="password"
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
