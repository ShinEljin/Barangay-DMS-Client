import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ElderlyIcon from "@mui/icons-material/Elderly";

import SquareIcon from "@mui/icons-material/Square";

function Dashboard(props) {
  return (
    <div className="bg-light-gray">
      <div className="text-center mt-4 text-xl font-bold | md:ml-[70px] md:text-2xl | lg:invisible lg:absolute">
        Dashboard
      </div>

      <div className="dashboard grid m-5 gap-5 grid-cols-1 | md:ml-[90px] md:grid-cols-2 | xl:ml-[350px] xl:grid-cols-3">
        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex">
            <div className="mr-9">
              <PeopleAltIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="font-medium text-xl w-full">
              Population
              <div className="card w-[60%] bg-[#033AA9] text-white p-2 ">
                1508
              </div>
              <div className="card w-[40%] bg-[#CF1429] text-white p-2 mt-1">
                992
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p>
              <SquareIcon sx={{ color: "#033AA9" }} /> Male
            </p>
            <p>
              <SquareIcon sx={{ color: "#CF1429" }} /> Female
            </p>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex">
            <div className="mr-9">
              <HowToVoteIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="font-medium text-xl w-full">
              Voters vs Non-voters
              <div className="card w-[65%] bg-[#033AA9] text-white p-2">
                1890
              </div>
              <div className="card w-[35%] bg-[#CF1429] text-white p-2 mt-1">
                750
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p>
              <SquareIcon sx={{ color: "#033AA9" }} /> Voters
            </p>
            <p>
              <SquareIcon sx={{ color: "#CF1429" }} /> Non-voters
            </p>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <div className="flex">
            <div className="mr-9">
              <ElderlyIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="font-medium text-xl w-full">
              Seniors and PWD
              <div className="card w-[75%] bg-[#033AA9] text-white p-2">
                302
              </div>
              <div className="card w-[25%] bg-[#CF1429] text-white p-2 mt-1">
                87
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p>
              <SquareIcon sx={{ color: "#033AA9" }} /> Seniors
            </p>
            <p>
              <SquareIcon sx={{ color: "#CF1429" }} /> PWD
            </p>
          </div>
        </div>

        <div className="bg-white flex-col px-10 py-2 rounded-2xl">
          <h3 className="text-center font-bold text-xl mb-2">
            Barangay 564 Officials
          </h3>

          <h5 className="text-center font-bold bg-dark-blue text-white border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            PUNONG BARANGAY
          </h5>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Joecel Alberto
          </p>

          <h5 className="text-center font-bold bg-dark-blue text-white border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            KAGAWAD
          </h5>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Stevenot De Leon
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Rodolfo Jose
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Alfonso Demillo Jr.
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Jhonny Fernandez
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Camilo Mempin
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Antonio Fabia
          </p>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Benison Acaya
          </p>

          <h5 className="text-center font-bold bg-dark-blue text-white border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            SK CHAIRMAN
          </h5>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Osmaleth Senangelo
          </p>

          <h5 className="text-center font-bold bg-dark-blue text-white border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            TREASURER
          </h5>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Emilia Sevandra
          </p>

          <h5 className="text-center font-bold bg-dark-blue text-white border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            SECRETARY
          </h5>
          <p className="text-center bg-light-gray border-black border-[1px] text-sm leading-6 rounded-sm mb-[2px]">
            Regina Esber
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
