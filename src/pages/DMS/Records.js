//MUI ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

//REACT AND NPM PACKAGES
import { useEffect, useState } from "react";
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
            <button className="bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer mr-2 | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 ">
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
        <table className="text-center shadow-lg rounded-2xl bg-white mx-auto overflow-hidden w-full | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              <td className="p-4">Full Name</td>
              <td className="p-4 invisible absolute | md:visible md:static">
                Birthday
              </td>
              <td className="p-4 invisible absolute | md:visible md:static">
                Address
              </td>
              <td className="p-4 invisible absolute | md:visible md:static">
                Phone Number
              </td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 && startLoading()}
            {(filteredRecords.length !== 0 || recordsEmpty) && stopLoading()}
            {recordsEmpty && (
              <tr>
                <td className="align-middle p-2 py-10" colSpan={8}>
                  NO RECORDS FOUND!
                </td>
              </tr>
            )}
            {filteredRecords.length !== 0 &&
              filteredRecords.map((record) => {
                return (
                  <tr
                    key={record._id}
                    className="border-b border-gray bg-white text-black "
                  >
                    <td className="p-2 py-5">
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
                    <td>
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
        </table>
      </div>
    </div>
  );
}

export default Records;
