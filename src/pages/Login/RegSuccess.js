import { Link } from "react-router-dom";
import HeaderLogo from "../../components/Login/HeaderLogo";

function RegSuccess() {
  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-60 | md:top-0">
          <span className="font-montserrat mx-auto text-5xl font-semibold mb-5 text-center">
            Registered Successfully!
          </span>
          <p className="mx-auto font-light">
            Please go back to
            <Link className="text-main-red underline font-bold ml-1" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegSuccess;
