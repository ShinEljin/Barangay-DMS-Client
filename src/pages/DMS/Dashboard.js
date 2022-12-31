import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BoyOutlinedIcon from "@mui/icons-material/BoyOutlined";
import GirlOutlinedIcon from "@mui/icons-material/GirlOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import ElderlyIcon from "@mui/icons-material/Elderly";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import Card from "../../components/DMS/Card";
import { useLogout } from "../../hooks/useLogout";
import SwalLoading from "../../components/DMS/SwalLoading";

import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = SwalLoading();

  const [infos, setInfos] = useState(null);

  useEffect(() => {
    async function getInfos() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        Swal.fire("Session Expired", "Please Login", "warning");
        logout();
        navigate("/");
      }
      const token = user.accessToken;
      const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        const response = await instance({
          method: "get",
          url: "/api/form/db-infos",
        });

        setInfos(response.data);
      } catch (error) {
        if (error.response) {
          Swal.fire("Session Expired", "Please Login", "warning");
          logout();
          navigate("/");
        }
      }
    }
    getInfos();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="bg-light-gray">
      {!infos && startLoading()}
      {infos && stopLoading()}
      {infos && (
        <div className="dashboard grid m-5 gap-5 grid-cols-1 | md:ml-[90px] md:grid-cols-2 | xl:ml-[350px] xl:grid-cols-3">
          <Card
            title="Population"
            number={infos.population}
            icon={<Diversity3Icon sx={{ fontSize: 60 }} />}
            className="bg-[#0D0F33] text-white"
          />

          <Card
            title="Male"
            number={infos.male}
            icon={<BoyOutlinedIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Female"
            number={infos.female}
            icon={<GirlOutlinedIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Seniors"
            number={infos.senior}
            icon={<ElderlyIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Voters"
            number={infos.voters}
            icon={<FingerprintIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Non-Voters"
            number={infos.nonVoters}
            icon={<PeopleAltIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Requests Receive"
            number={infos.requestsReceived}
            icon={<CallReceivedIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Verified Records"
            number={infos.verifiedRecords}
            icon={<VerifiedOutlinedIcon sx={{ fontSize: 60 }} />}
          />

          <Card
            title="Pending Records"
            number={infos.pendingRecords}
            icon={<PendingOutlinedIcon sx={{ fontSize: 60 }} />}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
