import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <div className="flex justify-between absolute w-full font-montserrat tracking-wide z-10 p-8">
        <div className="flex items-center font-semibold">
          <img
            className="h-20 | md:h-24"
            src="./images/Barangay_Seal.png"
            alt="Barangay_Seal"
          />
          <span className="invisible md:visible font-montserrat ml-3 text-xl">
            BARANGAY <br />
            MANAGEMENT <br />
            SYSTEM
          </span>
        </div>
        <img
          className="h-20 | md:h-24"
          src="./images/Manila_Seal.png"
          alt="Manila_Seal"
        />
      </div>

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-32 | md:top-0">
          <span className="font-montserrat mx-auto text-3xl font-semibold mb-5">
            REGISTRATION
          </span>
          <form action="" className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label htmlFor="text">Username</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-light"
                type="text"
                required
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 mb-1 p-3 text-black font-light"
                type="email"
                required
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-light"
                type="password"
                required
              />
              <br />
              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-20 text-black font-light"
                type="password"
                required
              />
              <br />
            </div>

            <button
              type="submit"
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red"
            >
              <Link to="/reg-success">Register</Link>
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
