/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import { loginApi } from "../../service/api";
import { notification } from "../../util/notification";
import { useUserUpdateData } from "../../provider/userProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const updateUser = useUserUpdateData();

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notification.warn("Please enter a valid email address.");
      return false;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      notification.warn(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    if (!validateFields()) return;
    try {
      const payload = { email, password };
      const response = await loginApi(payload);
      console.log(response);
      if (response.success) {
        const data = { ...response?.data, hasLogged: true };
        updateUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        notification.error(response?.message || "error");
      }
    } catch (error) {
      console.log("Error", error);
      notification.error("exception");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success w-100 rounded-0"
            >
              Login
            </button>
          </form>
          <p>Don't Have an Account?</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
