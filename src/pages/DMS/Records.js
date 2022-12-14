//MUI ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

//MUI COMPONENTS
import Pagination from "@mui/material/Pagination";

//REACT AND NPM PACKAGES
import { useEffect, useState } from "react";
import json2csv from "json2csv";
import Swal from "sweetalert2";

//INTERNAL MODULES
import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";
import SwalHTML from "../../components/DMS/SwalHTML";

function Records() {
  //SWAL
  const { startLoading, stopLoading } = SwalLoading();
  const { recordInfo } = SwalHTML();

  //VARIABLES
  const [records, setRecords] = useState([]);
  const [recordsEmpty, setRecordsEmpty] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  //FETCHING RECORDS
  useEffect(() => {
    async function getRequests() {
      const response = await api.get(`/form/records/${sortBy}`);

      if (response.data.length === 0) {
        setRecordsEmpty(true);
        setUserNumber(response.data.length);
      } else {
        setRecords(response.data);
        setUserNumber(response.data.length);
        setRecordsEmpty(false);
      }
      setCurrentPage(1);
    }

    getRequests();
  }, [sortBy, userNumber]);

  function getInfo(record) {
    Swal.fire({
      html: `<h1 class="font-bold text-[1.3rem]" >RECORD DETAILS</h1> 
              ${recordInfo(record)}
            `,
    });
  }

  function deleteRecord(record) {
    Swal.fire({
      title: "Delete?",
      html: `Do you want to delete this record? <br/> <strong>Records's Name: ${
        record.firstName + " " + record.middleName + " " + record.lastName
      }</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          startLoading();
          const response = await api.delete(`/form/records/${record._id}`);

          if (response.status === 200) {
            Swal.fire({
              title: "Record Successfully Deleted",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                setUserNumber((prevState) => (prevState -= 1));
              }
            });
          }
        } catch (error) {
          if (error.response) {
            Swal.fire("Somethin went wrong", "", "error");
          }
        }
      }
    });
  }

  function convertJsonToCsv(jsonData) {
    const fields = [
      { label: "Record ID", value: "_id" },
      { label: "Last Name", value: "lastName" },
      { label: "First Name", value: "firstName" },
      { label: "Middle Name", value: "middleName" },
      { label: "Address", value: "address" },
      { label: "Phone Number", value: "phone" },
      { label: "Birth Date", value: "bdate" },
      { label: "Email", value: "email" },
      { label: "Record Status", value: "recordStatus" },
      { label: "Person To Notify", value: "person2Notif" },
      { label: "Relationship", value: "relationship" },
      { label: "Person To Notify Phone Number", value: "person2NotifPhone" },
      { label: "Gender", value: "gender" },
      { label: "School Attaintment", value: "schoolAttainment" },
      { label: "Years Of Residency", value: "yearsOfResidency" },
    ];
    const opts = { fields };
    try {
      const csv = json2csv.parse(jsonData, opts);
      return csv;
    } catch (err) {
      console.error(err);
    }
  }

  function downloadCsv(csv) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "records.csv");
    document.body.appendChild(link);
    link.click();
  }

  const handleDownload = () => {
    const csv = convertJsonToCsv(records);
    downloadCsv(csv);
  };

  useEffect(() => {
    const newFilteredRecords = records.filter((record) => {
      return record.lastName.toLocaleLowerCase().includes(searchField);
    });

    setFilteredRecords(newFilteredRecords);
  }, [records, searchField]);

  function onSearchChange(event) {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    // | md:ml-[90px] | xl:ml-[350px]
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="mx-5 mt-5 px-4 transition-all duration-300  ">
        <div className="p-1 flex justify-between items-center flex-col gap-4 | md:flex-row">
          <div className="relative ">
            <SearchIcon
              className="absolute left-2 top-2"
              fontSize="large"
              sx={{ color: "gray" }}
            />
            <input
              placeholder="Search Last Name Here"
              type="search"
              className="bg-white border border-slate-400 rounded-xl p-2 pl-12 w-[20rem] | lg:w-[30rem] h-12 "
              onChange={onSearchChange}
            />
          </div>

          <div className=" flex justify-center items-center">
            <button
              className="bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer mr-2 | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 "
              onClick={handleDownload}
            >
              Download All Records
            </button>
            <button
              className="px-3 py-2 rounded-xl cursor-pointer | text-sm | lg:text-base lg:px-5 lg:py-3 relative"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Sort by
              <ArrowDropDownOutlinedIcon />
              {isSortOpen && (
                <ul className="absolute bg-[#ffffffef] w-[14rem] right-6 text-lg z-10">
                  <li
                    className="hover:bg-slate-300 p-2 font-semibold"
                    onClick={() => {
                      setSortBy(1);
                    }}
                  >
                    Last Name (A-Z)
                  </li>
                  <li
                    className="hover:bg-slate-300 p-2 font-semibold"
                    onClick={() => {
                      setSortBy(-1);
                    }}
                  >
                    Last Name (Z-A)
                  </li>
                </ul>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 text-sm | lg:text-lg">
        <table className=" text-left shadow-lg rounded-2xl bg-white mx-auto overflow-hidden w-full | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              <td className="p-4 pl-6 | 2xl:pl-[2%]">Full Name</td>
              <td className="p-4 pl-1 invisible absolute | md:visible md:static">
                Birth Date
              </td>
              <td className="p-4 pl-1 invisible absolute | md:visible md:static">
                Address
              </td>
              <td className="p-4 pl-1 invisible absolute | md:visible md:static">
                Phone Number
              </td>
              <td>Status</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 && startLoading()}
            {(filteredRecords.length !== 0 || recordsEmpty) && stopLoading()}
            {recordsEmpty && (
              <tr className="text-center">
                <td className="align-middle p-2 py-10 text-center" colSpan={8}>
                  NO RECORDS FOUND!
                </td>
              </tr>
            )}
            {filteredRecords.length !== 0 &&
              filteredRecords
                .slice(
                  currentPage * recordsPerPage - recordsPerPage,
                  currentPage * recordsPerPage
                )
                .map((record) => {
                  return (
                    <tr
                      key={record._id}
                      className="border-b border-gray bg-white text-black "
                    >
                      <td className="pl-6 py-5 | 2xl:pl-[2%]">
                        {record.lastName +
                          ", " +
                          record.firstName +
                          " " +
                          record.middleName}
                      </td>
                      <td className="p-1 invisible absolute | md:visible md:static">
                        {record.bdate}
                      </td>
                      <td className="p-1 invisible absolute | md:visible md:static">
                        {record.address}
                      </td>
                      <td className="p-1 invisible absolute | md:visible md:static">
                        {record.phone}
                      </td>
                      <td> {record.recordStatus}</td>
                      <td className="text-center">
                        <button data-title="SEE ALL DETAILS">
                          <AccountBoxIcon
                            className="hover:cursor-pointer"
                            sx={{
                              fontSize: "40px",
                              color: "#fff",
                              backgroundColor: "#000000",
                              borderRadius: "10px",
                              margin: "5px",
                              padding: "3px",
                              "&:hover": {
                                opacity: 0.6,
                              },
                            }}
                            onClick={(event) => getInfo(record)}
                          />
                        </button>
                        <button data-title="DELETE RECORD">
                          <DeleteIcon
                            className="hover:cursor-pointer"
                            color="#000000"
                            sx={{
                              fontSize: "40px",
                              color: "#fff",
                              backgroundColor: "#CF1429",
                              borderRadius: "10px",
                              margin: "5px",
                              padding: "3px",
                              "&:hover": {
                                opacity: 0.6,
                              },
                            }}
                            onClick={(event) => deleteRecord(record)}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
          <tr className="h-16">
            <td colSpan={6}>
              <div className="flex justify-between items-center mt-8 mb-4 px-6">
                <div className="text-sm text-slate-700">
                  showing{" "}
                  <span className="font-bold">
                    {filteredRecords.length === 0
                      ? 0
                      : currentPage * recordsPerPage - recordsPerPage + 1}
                    -
                    {currentPage * recordsPerPage >= filteredRecords.length
                      ? filteredRecords.length
                      : currentPage * recordsPerPage}
                  </span>{" "}
                  from{" "}
                  <span className="font-bold">{filteredRecords.length}</span>{" "}
                  records
                </div>
                <Pagination
                  className="bg-red"
                  count={Math.ceil(filteredRecords.length / recordsPerPage)}
                  page={currentPage}
                  onChange={handleChange}
                  shape="rounded"
                  variant="outlined"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#0D0F33",
                      border: 1,
                      borderRadius: 3,
                      padding: 2,
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      color: "white",
                      backgroundColor: "#0D0F33",
                    },
                  }}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Records;
