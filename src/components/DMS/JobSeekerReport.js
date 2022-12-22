import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SquareIcon from "@mui/icons-material/Square";
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

function JobSeekerReport({ title, ageGenderData, educData, noOfRequests }) {
  return (
    <div className="bg-white flex-col p-4 rounded-2xl col-span-3">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-xl mb-2">
          Report
          <span className="text-sm text-slate-500 font-light"> ({title})</span>
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
          Number of Requests{" "}
          <span className="text-red-500">{noOfRequests}</span>
        </h1>
        <h1 className="text-center font-bold text-xl mt-5">
          Age & Gender Graph
        </h1>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-4 | md:col-span-3 relative z-0">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart width={700} height={500} data={ageGenderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Male" stackId="a" fill="#033AA9" />
              <Bar dataKey="Female" stackId="a" fill="#CF1429" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-row justify-between ml-5 col-span-4  | md:col-span-1 md:flex-col">
          <div className="w-[70%]">
            <p className="text-center font-bold text-xl invisible absolute | md:visible md:static">
              Gender
            </p>
            <div className="w-[75%] bg-[#033AA9] text-white p-2">750</div>
            <div className="w-[25%] bg-[#CF1429] text-white p-2 mt-1">250</div>
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
                innerRadius={70}
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
      <div className="inline-block float-right text-white font-bold px-4 py-2 rounded-lg bg-[#033AA9]">
        Download Report
      </div>
    </div>
  );
}

export default JobSeekerReport;
