import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";
import api from "../../api/index";
import Swal from "sweetalert2";
import SwalLoading from "../../components/DMS/SwalLoading";

function Logs() {
  const [requests, setRequests] = useState([]);
  const [requestsEmpty, setRequestsEmpty] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [searchField, setSearchField] = useState("");
  const [statusFilter, setStatusFilter] = useState("Claimed");
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const { startLoading, stopLoading } = SwalLoading();

  useEffect(() => {
    async function getRequests() {
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
            <div class="text-left">
            <strong>Request ID:</strong> ${request._id} <br/>
              <strong>Request Date:</strong> ${request.requestDate} <br/>
              <strong>Processed Date:</strong> ${request.processedDate} <br/>
              <strong>Claimed Date:</strong> ${request.claimedDate} <br/>
              <strong>Document:</strong> ${request.document} <br/>
              <strong>Purpose:</strong> ${request.purpose} <br/>
              <strong>Specify:</strong> ${request.specify} <br/> <br/> 
            </div>
           
              <hr>
              <h1 class="font-bold text-[1.3rem]" >RECORD DETAILS</h1> 
            <div  class="text-left">
            <strong>Record ID:</strong> ${request.recordID._id} <br/>
              <strong>Fullname:</strong> ${
                request.recordID.firstName +
                " " +
                request.recordID.middleName +
                " " +
                request.recordID.lastName
              } <br/>
              <strong>Status:</strong> ${request.recordID.recordStatus} <br/>
              <strong>Address:</strong> ${request.recordID.address} <br/>
              <strong>Phone:</strong> ${request.recordID.phone} <br/>
              <strong>Email:</strong> ${request.recordID.email} <br/>
              <strong>Birth Date:</strong> ${request.recordID.bdate} <br/>
              <strong>Person To Notify:</strong> ${
                request.recordID.person2Notif
              } <br/>
              <strong>Relationship:</strong> ${
                request.recordID.relationship
              } <br/>
              <strong>Person To Notify (Number):</strong> ${
                request.recordID.person2NotifPhone
              } <br/>
              <strong>Gender:</strong> ${request.recordID.gender} <br/>
              <strong>School Attainment:</strong> ${
                request.recordID.schoolAttainment
              } <br/>
              <strong>Years of Residency:</strong> ${
                request.recordID.yearsOfResidency
              } <br/>
             </div>`,
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
        <table className="text-center shadow-lg rounded-2xl mx-auto bg-white overflow-hidden w-full | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              <td className="p-4">Claimed Date</td>
              <td className="p-4">Name</td>
              <td>Document</td>
              <td className="invisible absolute | md:visible md:static">
                Purpose
              </td>
              <td
                className="relative hover:cursor-pointer "
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                Status <ArrowDropDownOutlinedIcon />
                {isStatusOpen && (
                  <ul className="absolute bg-[#ffffffef] w-[14rem] right-6 text-lg z-10 shadow-lg">
                    <li
                      className="hover:bg-slate-300 hover:cursor-pointer p-2 font-semibold text-black "
                      onClick={(e) => {
                        setStatusFilter("Claimed");
                        setRequests([]);
                        setFilteredRequests([]);
                      }}
                    >
                      Claimed
                    </li>
                    <li
                      className="hover:bg-slate-300 hover:cursor-pointer p-2 font-semibold text-black"
                      onClick={(e) => {
                        setStatusFilter("Archive");
                        setRequests([]);
                        setFilteredRequests([]);
                      }}
                    >
                      Archive
                    </li>
                    <li
                      className="hover:bg-slate-300 hover:cursor-pointer p-2 font-semibold text-black"
                      onClick={(e) => {
                        setStatusFilter("Rejected");
                        setRequests([]);
                        setFilteredRequests([]);
                      }}
                    >
                      Rejected
                    </li>
                  </ul>
                )}
              </td>
              <td width="10%">Action</td>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && !requestsEmpty && startLoading()}
            {(filteredRequests.length !== 0 || requestsEmpty) && stopLoading()}
            {requestsEmpty && (
              <tr>
                <td className="align-middle p-2 py-16" colSpan={8}>
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
                    <td className="p-2 py-5">{request.claimedDate}</td>
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
