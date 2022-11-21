import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  isNotEmpty,
  isValidEmail,
  isPasswordsMatch,
  isPasswordStrong,
} from "../../validation/validation";
import { useRegister } from "../../hooks/useRegister";

import HeaderLogo from "../../components/Login/HeaderLogo";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const { register, serverError, isLoading } = useRegister();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isNotEmpty(username, email, password, confirmPassword)) {
      setError("Please input all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is not valid");
      return;
    }

    if (!isPasswordsMatch(password, confirmPassword)) {
      setError("Passwords not match");
      return;
    }

    if (!isPasswordStrong(password)) {
      setError("Password is weak");
      return;
    }

    setError(null);
    await register(username, email, password);
  }

  function togglePass() {
    setPasswordShown(!passwordShown);
  }

  function toggleConfirmPass() {
    setConfirmPasswordShown(!confirmPasswordShown);
  }

  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-32 | md:top-0">
          <span className="font-montserrat mx-auto text-3xl font-semibold mb-5">
            REGISTRATION
          </span>
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label htmlFor="text">Username</label>
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-normal"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                className="w-full h-11 rounded-lg border-0 mb-1 p-3 text-black font-normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <div className="relative">
                {passwordShown ? (
                  <FaEyeSlash
                    className="text-3xl absolute right-3 top-2 fill-blue-900 cursor-pointer"
                    inverse
                    onClick={togglePass}
                  />
                ) : (
                  <FaEye
                    className="text-3xl absolute right-3 top-2 fill-blue-900 cursor-pointer"
                    inverse
                    onClick={togglePass}
                  />
                )}
                <input
                  className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-normal"
                  type={passwordShown ? "text" : "password"}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@.!%&*?])[A-Za-z\d#$@!%.&*?]{8,30}$"
                  title="Must contain at least one number, special character, uppercase and lowercase letter, and at least 8 or more characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label htmlFor="password">Confirm Password</label>
              <div className="relative">
                {confirmPasswordShown ? (
                  <FaEyeSlash
                    className="text-3xl absolute right-3 top-2 fill-blue-900 cursor-pointer"
                    inverse
                    onClick={toggleConfirmPass}
                  />
                ) : (
                  <FaEye
                    className="text-3xl absolute right-3 top-2 fill-blue-900 cursor-pointer"
                    inverse
                    onClick={toggleConfirmPass}
                  />
                )}
                <input
                  className="w-full h-11 rounded-lg border-0 p-3  text-black font-normal"
                  type={confirmPasswordShown ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <p className="font-semibold text-red-500 mb-9 mt-2">
                {error ? error : serverError}
              </p>
            </div>

            <button
              type="submit"
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red"
              disabled={isLoading}
            >
              Register
            </button>
          </form>

          <div className="mx-auto relative top-6">
            <p className="font-light">
              Already have an account?
              <Link className="text-main-red underline font-bold ml-1" to="/">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
