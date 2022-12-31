import { useEffect, useState } from "react";
import JobSeekerReport from "../../components/DMS/JobSeekerReport";
import PieChartReport from "../../components/DMS/PieChartReport";
import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";

function Reports() {
  const { startLoading, stopLoading } = SwalLoading();

  const [jobSeekerRequests, setJobSeekerRequests] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [educAttainmentData, setEducAttainmentData] = useState(null);

  const [indigencyRequests, setIndigencyRequests] = useState(null);
  const [barangayIndigencyData, setBarangayIndigencyData] = useState(null);

  const [certificateRequests, setCertificateRequests] = useState(null);
  const [barangayCertificateData, setBarangayCertificateData] = useState(null);

  const [idRequests, setIdRequests] = useState(null);
  const [barangayIDData, setBarangayIDData] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    async function getAllForms() {
      setIdRequests(null);
      const requests = await api.get(`/form/all-forms/${month}`);

      setJobSeekerRequests(
        requests.data.filter((request) => {
          return request.document === "1st Time Job Seeker";
        })
      );

      setIndigencyRequests(
        requests.data.filter((request) => {
          return request.document === "Barangay Indigency";
        })
      );

      setCertificateRequests(
        requests.data.filter((request) => {
          return request.document === "Barangay Certificate";
        })
      );

      setIdRequests(
        requests.data.filter((request) => {
          return request.document === "Barangay ID";
        })
      );
    }
    getAllForms();
  }, [month]);

  //JOBSEEKER REQUESTS
  useEffect(() => {
    if (jobSeekerRequests) {
      //AGE DATA
      const yearNow = new Date().getFullYear();
      const lessten = jobSeekerRequests.filter((request) => {
        return yearNow - request.recordID.bdate.split("-")[0] < 10;
      });
      const ten = jobSeekerRequests.filter((request) => {
        return (
          yearNow - request.recordID.bdate.split("-")[0] >= 10 &&
          yearNow - request.recordID.bdate.split("-")[0] < 20
        );
      });
      const twenty = jobSeekerRequests.filter((request) => {
        return (
          yearNow - request.recordID.bdate.split("-")[0] >= 20 &&
          yearNow - request.recordID.bdate.split("-")[0] < 30
        );
      });
      const thirty = jobSeekerRequests.filter((request) => {
        return (
          yearNow - request.recordID.bdate.split("-")[0] >= 30 &&
          yearNow - request.recordID.bdate.split("-")[0] < 40
        );
      });
      const fourty = jobSeekerRequests.filter((request) => {
        return (
          yearNow - request.recordID.bdate.split("-")[0] >= 40 &&
          yearNow - request.recordID.bdate.split("-")[0] < 50
        );
      });
      const fifty = jobSeekerRequests.filter((request) => {
        return (
          yearNow - request.recordID.bdate.split("-")[0] >= 50 &&
          yearNow - request.recordID.bdate.split("-")[0] < 60
        );
      });
      const sixtyabove = jobSeekerRequests.filter((request) => {
        return yearNow - request.recordID.bdate.split("-")[0] >= 60;
      });

      setAgeData([
        {
          age: "Age: <10",
          Requests: parseInt(lessten.length),
          z: 122,
          pv: 30,
        },
        { age: "Age: 10-19", Requests: parseInt(ten.length), z: 73, pv: 40 },
        { age: "Age: 20-29", Requests: parseInt(twenty.length), z: 32, pv: 40 },
        { age: "Age: 30-39", Requests: parseInt(thirty.length), z: 23, pv: 40 },
        { age: "Age: 40-49", Requests: parseInt(fourty.length), z: 20, pv: 40 },
        { age: "Age: 50-59", Requests: parseInt(fifty.length), z: 29, pv: 40 },
        {
          age: "Age: >=60",
          Requests: parseInt(sixtyabove.length),
          z: 61,
          pv: 60,
        },
      ]);

      //GENDER DATA
      const male = jobSeekerRequests.filter((request) => {
        return request.recordID.gender === "Male";
      });
      const female = jobSeekerRequests.filter((request) => {
        return request.recordID.gender === "Female";
      });
      setGenderData({
        male: male.length,
        malePercent: (male.length / (male.length + female.length)) * 100,
        female: female.length,
        femalePercent: (female.length / (male.length + female.length)) * 100,
      });

      //EDUC DATA
      const oosy = jobSeekerRequests.filter((request) => {
        return request.recordID.schoolAttainment === "Out of School Youth";
      });
      const eg = jobSeekerRequests.filter((request) => {
        return request.recordID.schoolAttainment === "Elementary Graduate";
      });
      const hsg = jobSeekerRequests.filter((request) => {
        return request.recordID.schoolAttainment === "High School Graduate";
      });
      const shsg = jobSeekerRequests.filter((request) => {
        return (
          request.recordID.schoolAttainment === "Senior High School Graduate"
        );
      });
      const cg = jobSeekerRequests.filter((request) => {
        return request.recordID.schoolAttainment === "College Graduate";
      });
      const tv = jobSeekerRequests.filter((request) => {
        return request.recordID.schoolAttainment === "Technical Vocational";
      });
      setEducAttainmentData([
        {
          name: "Out of School Youth",
          value: oosy.length,
          fill: "#7676C7",
        },
        {
          name: "Elementary Graduate",
          value: eg.length,
          fill: "#BCB8E3",
        },
        {
          name: "High School Graduate",
          value: hsg.length,
          fill: "#FCBAB2",
        },
        {
          name: "Senior High School Graduate",
          value: shsg.length,
          fill: "#EB756A",
        },
        {
          name: "College Graduate",
          value: cg.length,
          fill: "#CF1429",
        },
        {
          name: "Technical Vocational",
          value: tv.length,
          fill: "#033AA9",
        },
      ]);
    }
  }, [jobSeekerRequests]);

  //INDIGENCY REQUESTS
  useEffect(() => {
    if (indigencyRequests) {
      const claimed = indigencyRequests.filter((request) => {
        return request.status === "Claimed";
      });
      const unclaimed = indigencyRequests.filter((request) => {
        return request.status === "Ready";
      });
      const rejected = indigencyRequests.filter((request) => {
        return request.status === "Rejected";
      });
      const others = indigencyRequests.filter((request) => {
        return request.status === "Archive";
      });

      setBarangayIndigencyData([
        {
          name: "Claimed",
          value: parseInt(claimed.length),
          fill: "#033AA9",
        },
        {
          name: "Unclaimed",
          value: parseInt(unclaimed.length),
          fill: "#CF1429",
        },
        {
          name: "Rejected",
          value: parseInt(rejected.length),
          fill: "#EB756A",
        },
        {
          name: "Archive",
          value: parseInt(others.length),
          fill: "#FCBAB2",
        },
      ]);
    }
  }, [indigencyRequests]);

  //CERTIFICATE REQUESTS
  useEffect(() => {
    if (certificateRequests) {
      const claimed = certificateRequests.filter((request) => {
        return request.status === "Claimed";
      });
      const unclaimed = certificateRequests.filter((request) => {
        return request.status === "Ready";
      });
      const rejected = certificateRequests.filter((request) => {
        return request.status === "Rejected";
      });
      const others = certificateRequests.filter((request) => {
        return request.status === "Archive";
      });

      setBarangayCertificateData([
        {
          name: "Claimed",
          value: parseInt(claimed.length),
          fill: "#033AA9",
        },
        {
          name: "Unclaimed",
          value: parseInt(unclaimed.length),
          fill: "#CF1429",
        },
        {
          name: "Rejected",
          value: parseInt(rejected.length),
          fill: "#EB756A",
        },
        {
          name: "Archive",
          value: parseInt(others.length),
          fill: "#FCBAB2",
        },
      ]);
    }
  }, [certificateRequests]);

  //ID REQUESTS
  useEffect(() => {
    if (idRequests) {
      const claimed = idRequests.filter((request) => {
        return request.status === "Claimed";
      });
      const unclaimed = idRequests.filter((request) => {
        return request.status === "Ready";
      });
      const rejected = idRequests.filter((request) => {
        return request.status === "Rejected";
      });
      const others = idRequests.filter((request) => {
        return request.status === "Archive";
      });

      setBarangayIDData([
        {
          name: "Claimed",
          value: parseInt(claimed.length),
          fill: "#033AA9",
        },
        {
          name: "Unclaimed",
          value: parseInt(unclaimed.length),
          fill: "#CF1429",
        },
        {
          name: "Rejected",
          value: parseInt(rejected.length),
          fill: "#EB756A",
        },
        {
          name: "Archive",
          value: parseInt(others.length),
          fill: "#FCBAB2",
        },
      ]);
    }
  }, [idRequests]);

  return (
    <div className="bg-light-gray">
      {!idRequests && startLoading()}
      {idRequests && stopLoading()}

      <div className="dashboard grid m-5 gap-5 grid-cols-1 | md:ml-[90px] md:grid-cols-2 | xl:ml-[350px] xl:grid-cols-3">
        {ageData && genderData && educAttainmentData && jobSeekerRequests && (
          <JobSeekerReport
            ageData={ageData}
            genderData={genderData}
            educData={educAttainmentData}
            noOfRequests={jobSeekerRequests.length}
            setMonth={setMonth}
            month={month}
          />
        )}

        {indigencyRequests && barangayIndigencyData && (
          <PieChartReport
            title="Barangay Indigency"
            data={barangayIndigencyData}
            noOfRequests={indigencyRequests.length}
          />
        )}

        {certificateRequests && barangayCertificateData && (
          <PieChartReport
            title="Barangay Certificate"
            data={barangayCertificateData}
            noOfRequests={certificateRequests.length}
          />
        )}

        {idRequests && barangayIDData && (
          <PieChartReport
            title="Barangay ID"
            data={barangayIDData}
            noOfRequests={idRequests.length}
          />
        )}
      </div>
    </div>
  );
}

export default Reports;
