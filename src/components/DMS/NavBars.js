import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

function NavBars({ tab, setTab }) {
  return (
    <div>
      <Sidebar setTab={setTab} tab={tab} />
      <TopBar tab={tab} />
      <Outlet />
    </div>
  );
}

export default NavBars;
