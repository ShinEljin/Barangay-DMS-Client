import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../../hooks/useAuthContext";

function TopBar(props) {
  const { user } = useAuthContext();

  return (
    <nav className="bg-light-violet shadow-[2px_2px_5px_rgba(0,0,0,0.3)] transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <label htmlFor="navbar-toggle" className="cursor-pointer">
            <MenuIcon fontSize="large" />
          </label>
          <span className="ml-4 text-3xl font-semibold">{props.tab}</span>
        </div>
        <div className="flex flex-row items-center ">
          <img
            src="../images/user-icon.png"
            alt="icon"
            width="45px"
            height="45px"
            className="mr-2 rounded-[50%]"
          />
          <div>
            <h4 className="font-semibold">{user && user.username}</h4>
            <small className="inline-block text-gray-500">Secretary</small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
