import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HeaderLogo from "../../components/Login/HeaderLogo";
import { useLogin } from "../../hooks/useLogin";
import { isNotEmptyLogin, isValidEmail } from "../../validation/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [passwordShown, setPasswordShown] = useState(false);

  const { login, serverError, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isNotEmptyLogin(email, password)) {
      setError("Please input all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter correct email format");
      return;
    }

    setError(null);
    await login(email, password);
  }

  function togglePass() {
    setPasswordShown(!passwordShown);
  }

  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-32 | md:top-0">
          <span className="font-montserrat mx-auto text-2xl font-semibold mb-12 text-center text-white | md:absolute md:invisible md:text-3xl">
            BARANGAY <br />
            MANAGEMENT <br />
            SYSTEM
          </span>
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label className="text-white" htmlFor="email">
                Enter Email
              </label>
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-normal"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="text-white" htmlFor="password">
                Enter Password
              </label>
              <div className="relative">
                {passwordShown ? (
                  <FaEyeSlash
                    className="text-3xl absolute right-3 top-2 fill-blue-900"
                    onClick={togglePass}
                  />
                ) : (
                  <FaEye
                    className="text-3xl absolute right-3 top-2 fill-blue-900"
                    onClick={togglePass}
                  />
                )}
                <input
                  className="w-full h-11 rounded-lg border-0 mb-1 p-3 text-black font-normal"
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between pb-20">
              <p className="font-semibold text-red-500">
                {error ? error : serverError}
              </p>
              <a
                href="https://barangay564-reg.up.railway.app/forgot"
                target="_blank"
                rel="noreferrer"
              >
                <p className="font-regular text-white text-base hover:cursor-pointer hover:opacity-80">
                  Forgot Password
                </p>
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red hover:cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>

        <p className="text-center text-main-off-white mt-12">
          Need an account?{" "}
          <a
            href="https://barangay564-reg.up.railway.app/"
            target="_blank"
            rel="noreferrer"
            className="text-[#DC715C] underline font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
