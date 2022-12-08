import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DangerousIcon from "@mui/icons-material/Dangerous";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";

function Requests(props) {
  const [requests, setRequests] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);

  const { startLoading, stopLoading } = SwalLoading();

  useEffect(() => {
    async function getRequests() {
      const response = await api.get("/form/requests");

      setRequests(response.data);
      setRequestNumber(response.data.length);
    }

    getRequests();
  }, [requestNumber]);

  function getInfo(request) {
    Swal.fire({
      html: `<div class="text-left">
            <strong>REQUEST DETAILS</strong> <br/> <br/>
            <strong>Request ID:</strong> ${request._id} <br/>
            <strong>Document:</strong> ${request.document} <br/>
            <strong>Purpose:</strong> ${request.purpose} <br/>
            <strong>Specify:</strong> ${request.specify} <br/>
            <strong>Fullname:</strong> ${
              request.recordID.firstName +
              " " +
              request.recordID.middleName +
              " " +
              request.recordID.lastName
            } <br/>
             <strong>Address:</strong> ${request.recordID.address} <br/>
             <strong>Age:</strong> ${request.recordID.age} <br/>
             <strong>Phone:</strong> ${request.recordID.phone} <br/>
             <strong>Birth Date:</strong> ${request.recordID.bdate} <br/>
             <strong>Gender:</strong> ${request.recordID.gender} <br/>
             <strong>Person To Notify:</strong> ${
               request.recordID.person2Notif
             } <br/>
             <strong>Person To Notify (Number):</strong> ${
               request.recordID.person2NotifPhone
             } <br/>
             <strong>School Attainment:</strong> ${
               request.recordID.schoolAttainment
             } <br/>
             <strong>Years of Residency:</strong> ${
               request.recordID.yearsIfResidency
             } <br/>
             <strong>Request Date:</strong> ${request.requestDate} <br/>
             </div>`,
    });
  }

  function processRequest(request) {
    Swal.fire({
      title: "Mark As Processed?",
      html: "Is the document is ready to claim? <br/> <br/> This will send an sms notification automatically to the requester's number if it is turned on",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.patch(`/form/${request._id}`);

        if (response.status === 200) {
          Swal.fire({
            title: "Request Successfully Mark as Processed",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setRequestNumber((prevState) => (prevState -= 1));
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  function rejectRequest(request) {
    Swal.fire({
      title: "Mark As Rejected?",
      html: `Do you want to mark this request as rejected? <br/> <strong>Requester's Name: ${
        request.recordID.firstName +
        " " +
        request.recordID.middleName +
        " " +
        request.recordID.lastName
      }</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.patch(`/form/reject/${request._id}`);

        if (response.status === 200) {
          Swal.fire({
            title: "Request has been Rejected",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setRequestNumber((prevState) => (prevState -= 1));
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  function deleteRequest(request) {
    Swal.fire({
      title: "Delete?",
      html: `Do you want to delete this request? <br/> <strong>Requester's Name: ${
        request.recordID.firstName +
        " " +
        request.recordID.middleName +
        " " +
        request.recordID.lastName
      }</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.delete(`/form/${request._id}`);

        if (response.status === 200) {
          Swal.fire({
            title: "Request Successfully Deleted",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setRequestNumber((prevState) => (prevState -= 1));
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  // async function printPdf(request) {}

  return (
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="mt-1 mr-5 transition-all duration-300 | md:ml-[90px] | xl:ml-[350px] ">
        <div className="p-1 flex justify-center | md:justify-end ">
          <button className="bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer mr-2 mt-4 | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 ">
            Download All Request Records
          </button>

          <a
            href="https://barangay564-forms.cyclic.app/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 "
          >
            <button className="bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 ">
              Add New Request
            </button>
          </a>
        </div>
      </div>

      <div className="p-4 text-sm | lg:text-lg">
        <table className="text-center shadow-lg rounded-2xl mx-auto bg-white overflow-hidden | md:w-full transition-all duration-300">
          {false && (
            <tr>
              <td className="bg-[#d6d5da]">
                <input type="checkbox" className="lg:h-5 lg:w-5 align-middle" />
              </td>
              <td className="bg-[#d6d5da] h-16" colSpan={8}>
                <div className="flex justify-between">
                  <div>
                    <span>N Selected</span>
                  </div>

                  <div>
                    {/* Desktop */}
                    <div className="inline invisible absolute | md:visible md:static md:px-3">
                      <input
                        type="checkbox"
                        className="lg:h-5 lg:w-5 align-middle"
                      />
                      <span className="px-2">Processed</span>
                    </div>

                    <div className="inline invisible absolute | md:visible md:static md:px-3">
                      <input
                        type="checkbox"
                        className="lg:h-5 lg:w-5 align-middle"
                      />
                      <span className="px-2">Delete</span>
                    </div>

                    {/* Mobile */}
                    <div className="inline visible static mr-2 | md:invisible md:absolute md:px-3">
                      <DeleteOutlineOutlinedIcon />
                    </div>

                    <div className="inline visible static mr-10 | md:invisible md:absolute md:px-3">
                      <SettingsOutlinedIcon />
                    </div>

                    <div className="md:px-3 md:pl-14 inline">
                      <CheckOutlinedIcon />
                    </div>

                    <div className="md:px-3 md:pr-11 inline">
                      <ClearOutlinedIcon />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}

          <thead className="text-white bg-dark-blue">
            <tr>
              <td></td>
              <td className="p-4">Request Dates</td>
              <td className="p-4">Name</td>
              <td>Document</td>
              <td className="invisible absolute | md:visible md:static">
                Purpose
              </td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {requests && requests.length === 0 && (
              <tr>
                <td className="align-middle p-2 py-5" colSpan={8}>
                  NO REQUESTS FOUND!
                </td>
              </tr>
            )}
            {!requests && startLoading()}
            {requests && stopLoading()}
            {requests &&
              requests.map((request) => {
                return (
                  <tr
                    key={request._id}
                    className="border-b border-gray bg-white text-black"
                  >
                    <td className="p-2 py-5">
                      <input
                        type="checkbox"
                        className="lg:h-5 lg:w-5 align-middle"
                      />
                    </td>
                    <td className="p-2">{request.requestDate}</td>
                    <td>
                      {request.recordID.firstName +
                        " " +
                        request.recordID.middleName +
                        " " +
                        request.recordID.lastName}
                    </td>
                    <td className="p-1">{request.document}</td>
                    <td className="invisible absolute | md:visible md:static">
                      {request.purpose === "Others"
                        ? request.specify
                        : request.purpose}
                    </td>
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
                          onClick={(event) => getInfo(request)}
                        />
                      </button>
                      <button data-title="MARK AS PROCESSED">
                        <FactCheckIcon
                          className="hover:cursor-pointer"
                          color="#000000"
                          sx={{
                            fontSize: "40px",
                            color: "#fff",
                            backgroundColor: "#033AA9",
                            borderRadius: "10px",
                            margin: "5px",
                            padding: "3px",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                          onClick={(event) => processRequest(request)}
                        />
                      </button>
                      <button>
                        <LocalPrintshopIcon
                          className="hover:cursor-pointer"
                          color="#000000"
                          sx={{
                            fontSize: "40px",
                            color: "#fff",
                            backgroundColor: "#033AA9",
                            borderRadius: "10px",
                            margin: "5px",
                            padding: "3px",
                            "&:hover": {
                              opacity: 0.6,
                            },
                          }}
                        />
                      </button>

                      <button data-title="REJECT REQUEST">
                        <DangerousIcon
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
                          onClick={(event) => rejectRequest(request)}
                        />
                      </button>
                      <button data-title="DELETE REQUEST">
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
                          onClick={(event) => deleteRequest(request)}
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

export default Requests;
