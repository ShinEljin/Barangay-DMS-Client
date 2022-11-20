import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "../../components/Login/HeaderLogo";
import { useLogin } from "../../hooks/useLogin";
import { isNotEmptyLogin, isValidEmail } from "../../validation/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { login, serverError, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isNotEmptyLogin(email, password)) {
      setError("Please input all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is not valid");
      return;
    }

    setError(null);
    await login(email, password);
  }

  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-32 | md:top-0">
          <span className="font-montserrat mx-auto text-2xl font-semibold mb-12 text-center | md:absolute md:invisible md:text-3xl">
            BARANGAY <br />
            MANAGEMENT <br />
            SYSTEM
          </span>
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label htmlFor="email">Enter Email</label>
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-normal"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Enter Password</label>
              <input
                className="w-full h-11 rounded-lg border-0 mb-1 p-3 text-black font-normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between pb-20">
              <p className="font-semibold text-red-500">
                {error ? error : serverError}
              </p>
              <p className="font-extralight underline text-red-500">
                <Link to="/forgot">Forgot Password</Link>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red hover:cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mx-auto relative top-6">
            <p className="font-light">
              Need an account?
              <Link
                className="text-main-red underline font-bold ml-1"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
