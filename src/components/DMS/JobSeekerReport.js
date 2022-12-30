import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SquareIcon from "@mui/icons-material/Square";
import { useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function JobSeekerReport({
  ageData,
  genderData,
  educData,
  noOfRequests,
  setMonth,
  month,
}) {
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  return (
    <div className="bg-white flex-col p-4 rounded-2xl col-span-3">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-xl mb-2">1st Time Job Seeker</h3>
        <div
          className="hover:cursor-pointer relative"
          onClick={() => setIsMonthOpen(!isMonthOpen)}
        >
          {getMonthName(month + 1)}
          <ArrowDropDownOutlinedIcon />
          {isMonthOpen && (
            <div className="absolute bg-slate-300 top-6 right-2">
              <li className="list-none">
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(0)}
                >
                  January
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(1)}
                >
                  February
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(2)}
                >
                  March
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(3)}
                >
                  April
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(4)}
                >
                  May
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(5)}
                >
                  June
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(6)}
                >
                  July
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(7)}
                >
                  August
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(8)}
                >
                  September
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(9)}
                >
                  October
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(10)}
                >
                  November
                </ul>
                <ul
                  className="px-4 py-1 hover:bg-slate-200 text-lg"
                  onClick={() => setMonth(11)}
                >
                  December
                </ul>
              </li>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-center font-bold text-xl mt-6 mb-4">
          Number of Requests{" "}
          <span className="text-red-500">{noOfRequests}</span>
        </h1>
      </div>

      <div className="grid grid-cols-4">
        <div className="col-span-4 | md:col-span-3 relative z-0">
          <h1 className="text-center font-bold text-xl mt-5">Age Graph</h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageData}>
              <XAxis dataKey="age" />
              <YAxis
                label={{
                  value: "No.Of Requests",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="Requests" stackId="a" fill="#033AA9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-row justify-between ml-12 col-span-4 | md:col-span-1 md:flex-col">
          <div className="w-[100%]">
            <p className="text-center font-bold text-xl invisible absolute mt-6 mb-4 | md:visible md:static">
              Gender
            </p>
            <div
              className={`w-[${genderData.malePercent}%] bg-[#033AA9] text-white p-2`}
            >
              {genderData.male}
            </div>
            <div
              className={`w-[${genderData.femalePercent}%] bg-[#CF1429] text-white p-2 mt-1`}
            >
              {genderData.female}
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={700} height={250}>
              <Tooltip />
              <Pie
                data={educData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
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
            <SquareIcon sx={{ color: "#EB756A" }} /> Senior High School Graduate
          </p>
          <p className="text-xs">
            <SquareIcon sx={{ color: "#CF1429" }} /> College Graduate
          </p>
          <p className="text-xs">
            <SquareIcon sx={{ color: "#033AA9" }} /> Technical Vocational
          </p>
        </div>
      </div>

      <button className="inline-block float-right text-white font-bold px-6 py-3 rounded-lg hover:opacity-70 hover:cursor-pointer bg-[#033AA9]">
        Download Report
      </button>
    </div>
  );
}

export default JobSeekerReport;
