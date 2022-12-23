import GridViewIcon from "@mui/icons-material/GridView";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import SidebarListItem from "./SidebarListItem";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

function Sidebar({ setTab, tab }) {
  const navigate = useNavigate();

  const { logout } = useLogout();

  function Logout() {
    Swal.fire({
      title: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  }

  useEffect(() => {
    setTab(localStorage.getItem("tab"));
  }, [setTab]);

  function setTabStorage(tabName) {
    setTab(tabName);
    localStorage.setItem("tab", tabName);
  }

  return (
    <React.Fragment>
      <input type="checkbox" id="navbar-toggle" className="hidden absolute" />
      <div className="opacity-0 invisible absolute bg-navbar-bg bg-cover bg-center text-white | md:bg-cover md:opacity-100 md:visible md:h-screen md:w-[70px] md:fixed | xl:opacity-100 xl:visible xl:h-screen xl:w-[330px] xl:fixed | 2xl:bg-auto">
        <div className="flex | md:p-6 md:pb-[3.5rem] | xl:p-6 ease-linear">
          <img
            alt="Barangay Seal"
            src="../images/Barangay_Seal.png"
            className="h-14 w-14 border border-white rounded-full mr-6
                     md:h-6 md:w-6
                     xl:h-14 xl:w-14"
          />
          <div className="location md:invisible md:absolute | xl:visible xl:static">
            <h2 className="font-bold text-xl">Barangay 564</h2>
            <p>Sampaloc Manila, NCR</p>
          </div>
        </div>

        <div className="list-item-box flex flex-col h-[85%] justify-between | md:py-0 | xl:px-6">
          <ul>
            <Link
              to="/user/dashboard"
              onClick={() => setTabStorage("Dashboard")}
            >
              <SidebarListItem
                item="Dashboard"
                icon=<GridViewIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Dashboard"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>

            <Link to="/user/requests" onClick={() => setTabStorage("Requests")}>
              <SidebarListItem
                item="Requests"
                icon=<TopicOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Requests"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>

            <Link to="/user/claiming" onClick={() => setTabStorage("Claiming")}>
              <SidebarListItem
                item="Claiming"
                icon=<DomainVerificationOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Claiming"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>

            <Link to="/user/logs" onClick={() => setTabStorage("Logs")}>
              <SidebarListItem
                item="Logs"
                icon=<WorkOutlineOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Logs" ? "bg-white text-dark-blue rounded-l-3xl" : ""
                }
              />
            </Link>

            <Link to="/user/records" onClick={() => setTabStorage("Records")}>
              <SidebarListItem
                item="Records"
                icon=<ManageSearchOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Records"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>

            <Link to="/user/reports" onClick={() => setTabStorage("Reports")}>
              <SidebarListItem
                item="Reports"
                icon=<HomeRepairServiceOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Reports"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>
          </ul>

          <ul>
            <Link to="/user/settings" onClick={() => setTabStorage("Settings")}>
              <SidebarListItem
                item="Settings"
                icon=<SettingsOutlinedIcon sx={{ fontSize: 40 }} />
                className={
                  tab === "Settings"
                    ? "bg-white text-dark-blue rounded-l-3xl"
                    : ""
                }
              />
            </Link>
            <SidebarListItem
              className={"mb-6 | 2xl:mb-0"}
              item="Sign Out"
              icon=<LogoutOutlinedIcon sx={{ fontSize: 40 }} />
              onClick={Logout}
            />
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
