import { Link } from "react-router-dom";
import HeaderLogo from "../../components/Login/HeaderLogo";

function Otp() {
  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-48 | md:top-0">
          <span className="font-montserrat mx-auto text-3xl font-semibold mb-5">
            VERIFICATION
          </span>
          <div className="mx-auto w-4/5 text-center mb-9">
            <p className="font-light">You will get an OTP via Email</p>
          </div>
          <form action="" className="w-4/5 mx-auto">
            <div className="w-full font-extralight font-poppins">
              <label htmlFor="email">One Time Password</label>
              <br />
              <input
                className="w-full h-11 rounded-lg border-0 p-3 mb-2 text-black font-light"
                type="text"
              />
              <br />
            </div>

            <div className="flex justify-between pb-20">
              <p className="font-extralight text-red-500">Invalid OTP</p>
              <p className="font-extralight text-slate-400">
                <a href="#!">Resend OTP</a>
              </p>
            </div>

            <button
              type="submit"
              className="rounded-xl border-0 block h-10 w-52 bg-main-red text-white text-2xl mx-auto font-semibold font-poppins hover:bg-white hover:text-main-red"
            >
              <Link to="/new-pass">Verify</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;
