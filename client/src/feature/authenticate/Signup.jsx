import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles.css";
import { notification } from "../../util/notification";
import { registerUser } from "../../service/api";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    const { firstName, lastName, userName, phoneNumber, email, password } = {
      ...formData,
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName.length > 0) {
      notification.warn("Please enter a valid name.");
      return false;
    }

    if (!lastName.length > 0) {
      notification.warn("Please enter a valid last name.");
      return false;
    }
    if (!userName.length > 0) {
      notification.warn("Please enter a valid username.");
      return false;
    }
    const phoneNumberRegex = /^\d{3}\d{3}\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      notification.warn("Invalid phone number");
      return false;
    }
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
      const payload = { ...formData };
      const response = await registerUser(payload);
      console.log(response);
      if (response.success) {
        notification.success(response?.message || "Success");
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
          <h4>Register</h4>
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="First Name"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Last name"
                autoComplete="off"
                name="Last name"
                className="form-control rounded-0"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="userName"
                placeholder="User name"
                autoComplete="off"
                name="userName"
                className="form-control rounded-0"
                value={formData.userName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, userName: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                placeholder="Phone number"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>
          <p>Already Have an Account?</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
