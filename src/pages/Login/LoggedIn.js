import { useNavigate } from "react-router-dom";
import HeaderLogo from "../../components/Login/HeaderLogo";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";

function LoggedIn() {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { logout } = useLogout();

  function Logout() {
    logout();
    navigate("/");
  }

  useEffect(() => {}, []);

  return (
    <div className="bg-main-bg bg-cover h-screen flex justify-end h-desktop">
      <HeaderLogo />

      <div className="bg-main-low-opacity flex flex-col w-full h-desktop | md:justify-center md:w-[32rem] md:rounded-l-3xl">
        <div className="flex flex-col relative top-60 | md:top-0">
          <span className="font-montserrat mx-auto text-5xl font-semibold mb-5 text-center">
            Logged in as
          </span>
          <p className="mx-auto font-light">{user && user.username}</p>
          <p className="mx-auto font-light">{user && user.email}</p>
          <p className="mx-auto font-light text-main-red underline">
            <button onClick={Logout}>Logout</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
