import SquareIcon from "@mui/icons-material/Square";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function PieChartReport({ title, data, noOfRequests }) {
  return (
    <div className="bg-white flex-col p-4 rounded-2xl col-span-3 | xl:col-span-1">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
      </div>
      <div>
        <h1 className="text-center font-bold text-xl mt-5">
          Number of Requests{" "}
          <span className="text-red-500">{noOfRequests}</span>
        </h1>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-4 | md:col-span-3 relative z-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Pie
                data={data}
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
        <div className="col-span-4 | md:mt-20 md:col-span-1">
          <p className="text-xs">
            <SquareIcon sx={{ color: "#033AA9" }} /> Claimed
          </p>
          <p className="text-xs">
            <SquareIcon sx={{ color: "#CF1429" }} /> Unclaimed
          </p>
          <p className="text-xs">
            <SquareIcon sx={{ color: "#EB756A" }} /> Rejected
          </p>
          <p className="text-xs">
            <SquareIcon sx={{ color: "#FCBAB2" }} /> Others
          </p>
        </div>
      </div>
      <button className="inline-block float-right text-white font-bold px-4 py-2 rounded-lg hover:opacity-70 hover:cursor-pointer bg-[#033AA9]">
        Download Report
      </button>
    </div>
  );
}

export default PieChartReport;
