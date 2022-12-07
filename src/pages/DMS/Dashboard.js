import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ElderlyIcon from "@mui/icons-material/Elderly";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SquareIcon from "@mui/icons-material/Square";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function Dashboard(props) {
  const barData = [
    { name: "<10", x: 12, y: 12, z: 122 },
    { name: "11-20", x: 40, y: 10, z: 73 },
    { name: "21-30", x: 60, y: 15, z: 32 },
    { name: "31-40", x: 35, y: 35, z: 23 },
    { name: "41-50", x: 25, y: 35, z: 20 },
    { name: "51-60", x: 10, y: 25, z: 29 },
    { name: ">60", x: 5, y: 10, z: 61 },
  ];

  const data01 = [
    {
      name: "Out of School Youth",
      value: 400,
      fill: "#7676C7",
    },
    {
      name: "Elementary Graduate",
      value: 300,
      fill: "#BCB8E3",
    },
    {
      name: "High School Graduate",
      value: 300,
      fill: "#FCBAB2",
    },
    {
      name: "Senior High School Graduate",
      value: 200,
      fill: "#EB756A",
    },
    {
      name: "College Graduate",
      value: 278,
      fill: "#CF1429",
    },
    {
      name: "Technical Vocational",
      value: 189,
      fill: "#033AA9",
    },
  ];

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
              <div className="card w-[40%] bg-[#033AA9] text-white p-2 ">
                604
              </div>
              <div className="card w-[%60] bg-[#CF1429] text-white p-2 mt-1">
                908
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
                982
              </div>
              <div className="card w-[35%] bg-[#CF1429] text-white p-2 mt-1">
                530
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

        <div className="bg-white flex-col p-4 rounded-2xl col-span-1 | md:col-span-2">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-xl mb-2">
              Report
              <span className="text-sm text-slate-500 font-light">
                (1st Time Job Seeker)
              </span>
            </h3>
            <p>
              This Month
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
          <div>
            <h1 className="text-center font-bold text-xl mt-5">
              Number of Requests <span className="text-red-500">7000</span>
            </h1>
            <h1 className="text-center font-bold text-xl mt-5">
              Age & Gender Graph
            </h1>
          </div>

          <div className="grid grid-cols-4">
            <div className="col-span-4 | md:col-span-3 relative z-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart width={700} height={500} data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="x" stackId="a" fill="#033AA9" />
                  <Bar dataKey="y" stackId="a" fill="#CF1429" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-row justify-between ml-5 col-span-4  | md:col-span-1 md:flex-col">
              <div className="w-[70%]">
                <p className="text-center font-bold text-xl invisible absolute | md:visible md:static">
                  Gender
                </p>
                <div className="w-[55%] bg-[#033AA9] text-white p-2">893</div>
                <div className="w-[45%] bg-[#CF1429] text-white p-2 mt-1">
                  782
                </div>
              </div>
              <div className="md:mb-7 flex flex-col justify-end">
                <p className="text-xs">
                  <SquareIcon sx={{ color: "#033AA9" }} /> Male
                </p>
                <p className="text-xs">
                  <SquareIcon sx={{ color: "#CF1429" }} /> Female
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-center font-bold text-xl mt-5">
            Educational Attainment
          </h1>
          <div className="grid grid-cols-4">
            <div className="col-span-4 | md:col-span-2 relative z-0">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart width={730} height={250}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-4 | md:mt-9 md:col-span-2">
              <p className="text-xs">
                <SquareIcon sx={{ color: "#7676C7" }} /> Out of School Youth
              </p>
              <p className="text-xs">
                <SquareIcon sx={{ color: "#BCB8E3" }} /> Elementary Graduate
              </p>
              <p className="text-xs">
                <SquareIcon sx={{ color: "#FCBAB2" }} /> High School Graduate
              </p>
              <p className="text-xs">
                <SquareIcon sx={{ color: "#EB756A" }} /> Senior High School
                Graduate
              </p>
              <p className="text-xs">
                <SquareIcon sx={{ color: "#CF1429" }} /> College Graduate
              </p>
              <p className="text-xs">
                <SquareIcon sx={{ color: "#033AA9" }} /> Technical Vocational
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
