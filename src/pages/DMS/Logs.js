//MUI ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";

//REACT AND NPM PACKAGES
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

//INTERNAL MODULES
import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";
import SwalHTML from "../../components/DMS/SwalHTML";

function Logs() {
  //SWAL
  const { startLoading, stopLoading } = SwalLoading();
  const { requestInfo, recordInfo } = SwalHTML();

  //VARIABLES
  const [requests, setRequests] = useState([]);
  const [requestsEmpty, setRequestsEmpty] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [searchField, setSearchField] = useState("");
  const [statusFilter, setStatusFilter] = useState("Claimed");

  //FETCHING REQUESTS
  useEffect(() => {
    async function getRequests() {
      setRequests([]);
      setFilteredRequests([]);
      const response = await api.get(`/form/logs/${statusFilter}`);

      if (response.data.length === 0) {
        setRequestsEmpty(true);
      } else {
        setRequests(response.data);
        setRequestsEmpty(false);
      }
    }

    getRequests();
  }, [statusFilter]);

  function getInfo(request) {
    Swal.fire({
      html: `<h1 class="font-bold text-[1.3rem]" >REQUEST DETAILS</h1> 
              ${requestInfo(request)}
              <hr>
              <h1 class="font-bold text-[1.3rem]" >RECORD DETAILS</h1> 
              ${recordInfo(request.recordID)}
            `,
    });
  }

  useEffect(() => {
    const newFilteredRequests = requests.filter((request) => {
      return request.recordID.lastName
        .toLocaleLowerCase()
        .includes(searchField);
    });

    setFilteredRequests(newFilteredRequests);
  }, [requests, searchField]);

  function onSearchChange(event) {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
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
              className="bg-white border border-slate-400 rounded-xl p-2 pl-12 w-[20rem] | lg:w-[30rem] h-12"
              onChange={onSearchChange}
            />
          </div>

          <div className=" flex justify-center items-center flex-row">
            <button className="bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer mr-2 | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 ">
              Download Logs
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 text-sm | lg:text-lg">
        <div className="flex flex-row">
          <button
            className={`py-2 px-6 rounded-t-2xl hover:opacity-80 text-white   ${
              statusFilter === "Claimed" ? "bg-[#0D0F33]" : "bg-[#0D0F33af]"
            } | md:px-12 `}
            onClick={(e) => setStatusFilter("Claimed")}
          >
            Claimed
          </button>
          <button
            className={`py-2 px-6 rounded-t-2xl text-white bg-dark-blue hover:opacity-80 ${
              statusFilter === "Rejected" ? "bg-[#0D0F33]" : "bg-[#0D0F33af]"
            } | md:px-12`}
            onClick={(e) => setStatusFilter("Rejected")}
          >
            Rejected
          </button>
          <button
            className={`py-2 px-6 rounded-t-2xl text-white bg-dark-blue hover:opacity-80 ${
              statusFilter === "Archive" ? "bg-[#0D0F33]" : "bg-[#0D0F33af]"
            } | md:px-12`}
            onClick={(e) => setStatusFilter("Archive")}
          >
            Archive
          </button>
        </div>
        <table className="text-center shadow-lg rounded-r-2xl rounded-bl-2xl mx-auto bg-white overflow-hidden w-full | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              {statusFilter !== "Archive" && (
                <td className="p-4">
                  {statusFilter === "Claimed" && "Claimed Date"}
                  {statusFilter === "Rejected" && "Rejected Date"}
                </td>
              )}

              <td className="p-4">Name</td>
              <td>Document</td>
              <td className="invisible absolute | md:visible md:static">
                Purpose
              </td>
              <td className="invisible absolute | md:visible md:static">
                Status
              </td>
              <td width="10%">Action</td>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && !requestsEmpty && startLoading()}
            {(filteredRequests.length !== 0 || requestsEmpty) && stopLoading()}
            {requestsEmpty && (
              <tr>
                <td className="align-middle p-2 py-8" colSpan={8}>
                  NO LOGS FOUND!
                </td>
              </tr>
            )}
            {filteredRequests.length !== 0 &&
              filteredRequests.map((request) => {
                return (
                  <tr
                    key={request._id}
                    className="border-b border-gray bg-white text-black"
                  >
                    {statusFilter !== "Archive" && (
                      <td className="p-2 py-5">
                        {request.claimedDate && request.claimedDate}
                        {request.rejectedDate && request.rejectedDate}
                      </td>
                    )}

                    <td className="p-2 py-5">
                      {request.recordID.firstName +
                        " " +
                        request.recordID.middleName +
                        " " +
                        request.recordID.lastName}
                    </td>
                    <td className="p-2">{request.document}</td>
                    <td className="invisible absolute | md:visible md:static">
                      {request.purpose}
                    </td>
                    <td className="invisible absolute | md:visible md:static">
                      {request.status}
                    </td>
                    <td width="10%">
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
                          onClick={(event) => getInfo(request)}
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

export default Logs;
