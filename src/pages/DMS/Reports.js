import JobSeekerReport from "../../components/DMS/JobSeekerReport";
import PieChartReport from "../../components/DMS/PieChartReport";

function Reports() {
  const barData = [
    { name: "<10", Male: 12, Female: 12, z: 122, pv: 30 },
    { name: "11-20", Male: 40, Female: 10, z: 73, pv: 40 },
    { name: "21-30", Male: 60, Female: 15, z: 32, pv: 40 },
    { name: "31-40", Male: 35, Female: 35, z: 23, pv: 40 },
    { name: "41-50", Male: 25, Female: 35, z: 20, pv: 40 },
    { name: "51-60", Male: 10, Female: 25, z: 29, pv: 40 },
    { name: ">60", Male: 5, Female: 10, z: 61, pv: 60 },
  ];

  const educAttainmentData = [
    {
      name: "Out of School Youth",
      value: 202,
      fill: "#7676C7",
    },
    {
      name: "Elementary Graduate",
      value: 125,
      fill: "#BCB8E3",
    },
    {
      name: "High School Graduate",
      value: 243,
      fill: "#FCBAB2",
    },
    {
      name: "Senior High School Graduate",
      value: 98,
      fill: "#EB756A",
    },
    {
      name: "College Graduate",
      value: 543,
      fill: "#CF1429",
    },
    {
      name: "Technical Vocational",
      value: 23,
      fill: "#033AA9",
    },
  ];

  const barangayIndigencyData = [
    {
      name: "Claimed",
      value: 1289,
      fill: "#033AA9",
    },
    {
      name: "Unclaimed",
      value: 167,
      fill: "#CF1429",
    },
    {
      name: "Rejected",
      value: 24,
      fill: "#EB756A",
    },
    {
      name: "Others",
      value: 20,
      fill: "#FCBAB2",
    },
  ];

  const barangayCertificateData = [
    {
      name: "Claimed",
      value: 1289,
      fill: "#033AA9",
    },
    {
      name: "Unclaimed",
      value: 167,
      fill: "#CF1429",
    },
    {
      name: "Rejected",
      value: 24,
      fill: "#EB756A",
    },
    {
      name: "Others",
      value: 20,
      fill: "#FCBAB2",
    },
  ];

  const barangayIDData = [
    {
      name: "Claimed",
      value: 1289,
      fill: "#033AA9",
    },
    {
      name: "Unclaimed",
      value: 167,
      fill: "#CF1429",
    },
    {
      name: "Rejected",
      value: 24,
      fill: "#EB756A",
    },
    {
      name: "Others",
      value: 20,
      fill: "#FCBAB2",
    },
  ];

  return (
    <div className="bg-light-gray">
      <div className="dashboard grid m-5 gap-5 grid-cols-1 | md:ml-[90px] md:grid-cols-2 | xl:ml-[350px] xl:grid-cols-3">
        <JobSeekerReport
          title="Barangay Indigency"
          ageGenderData={barData}
          educData={educAttainmentData}
          noOfRequests="1000"
        />
        <PieChartReport
          title="Barangay Indigency"
          data={barangayIndigencyData}
          noOfRequests="1500"
        />
        <PieChartReport
          title="Barangay Certificate"
          data={barangayCertificateData}
          noOfRequests="1500"
        />
        <PieChartReport
          title="Barangay ID"
          data={barangayIDData}
          noOfRequests="1500"
        />
      </div>
    </div>
  );
}

export default Reports;
