//MUI ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArchiveIcon from "@mui/icons-material/Archive";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//REACT AND NPM PACKAGES
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import ReactToPrint from "react-to-print";

//INTERNAL MODULES
import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";
import SwalHTML from "../../components/DMS/SwalHTML";
import CertificateTemplate from "../../components/DMS/CertificateTemplate";
import IdTemplate from "../../components/DMS/IdTemplate";

function Requests() {
  //SWAL
  const { startLoading, stopLoading } = SwalLoading();
  const { requestInfo, recordInfo } = SwalHTML();

  //REFS
  const componentsRef = useRef([]);
  const inputsRef = useRef([]);

  //VARIABLES
  const [requests, setRequests] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [requestNumberVerified, setRequestNumberVerified] = useState(null);
  const [requestNumberPending, setRequestNumberPending] = useState(null);
  const [userStatusFilter, setUserStatusFilter] = useState("Verified");
  const [multipleIds, setMultipleIds] = useState([]);

  //FETCHING REQUESTS
  useEffect(() => {
    async function getRequests() {
      setRequests(null);
      setMultipleIds([]);
      const response = await api.get("/form/requests");

      var result = response.data.filter(function (object) {
        return object.recordID.recordStatus === userStatusFilter;
      });

      var verifiedResult = response.data.filter(function (object) {
        return object.recordID.recordStatus === "Verified";
      });

      var pendingResult = response.data.filter(function (object) {
        return object.recordID.recordStatus === "Pending";
      });

      setRequests(result);
      setRequestNumber(response.data.length);
      setRequestNumberVerified(verifiedResult.length);
      setRequestNumberPending(pendingResult.length);
      inputsRef.current = [];
    }

    getRequests();
  }, [requestNumber, userStatusFilter]);

  function getInfo(request) {
    Swal.fire({
      html: `<h1 class="font-bold text-[1.3rem]" >REQUEST DETAILS</h1> 
              ${requestInfo(request.recordID)}
              <hr>
              <h1 class="font-bold text-[1.3rem]" >RECORD DETAILS</h1> 
              ${recordInfo(request.recordID)}
            `,
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
        startLoading();
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

  function markVerified(request) {
    Swal.fire({
      title: "Mark As Verified?",
      html: `Do you want to mark this request as verified? <br/> <strong>Requester's Name: ${
        request.recordID.firstName +
        " " +
        request.recordID.middleName +
        " " +
        request.recordID.lastName
      }</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        const response = await api.patch(
          `/form/record-status/${request.recordID._id}`
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Request has been Verified",
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
        startLoading();
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

  function archiveRequest(request) {
    Swal.fire({
      title: "Archive?",
      html: `Do you want to archive this request? <br/> <strong>Requester's Name: ${
        request.recordID.firstName +
        " " +
        request.recordID.middleName +
        " " +
        request.recordID.lastName
      }</strong> `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      startLoading();
      if (result.isConfirmed) {
        const response = await api.patch(`/form/archive/${request._id}`);

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

  function handleCheckBox() {
    setMultipleIds([]);

    for (let i = 0; i < inputsRef.current.length; i++) {
      if (inputsRef.current[i] !== null) {
        if (inputsRef.current[i].checked) {
          setMultipleIds((multipleIds) => [
            ...multipleIds,
            inputsRef.current[i].id,
          ]);
        }
      }
    }
  }

  function selectAll(e) {
    setMultipleIds([]);
    for (let i = 0; i < inputsRef.current.length; i++) {
      if (inputsRef.current[i] !== null) {
        inputsRef.current[i].checked = true;
        setMultipleIds((multipleIds) => [
          ...multipleIds,
          inputsRef.current[i].id,
        ]);
      }
    }
  }

  function processMultiple() {
    Swal.fire({
      title: "Mark All As Processed?",
      html: `${multipleIds.length} request will be mark as processed, this will send sms notification. <br/> <br/> Do you want to proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        let response;
        for (let i = 0; i < multipleIds.length; i++) {
          response = await api.patch(`/form/${multipleIds[i]}`);
        }
        if (response.status === 200) {
          Swal.fire({
            title: "All Requests Successfully Mark as Processed",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setMultipleIds([]);
              setRequestNumber(
                (prevState) => (prevState -= multipleIds.length)
              );
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  function rejectMultiple() {
    Swal.fire({
      title: "Mark All As Rejected?",
      html: `${multipleIds.length} request will be mark as reject. <br/> <br/> Do you want to proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        let response;
        for (let i = 0; i < multipleIds.length; i++) {
          response = await api.patch(`/form/reject/${multipleIds[i]}`);
        }
        if (response.status === 200) {
          Swal.fire({
            title: "All Requests Successfully Mark as Rejected",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setMultipleIds([]);
              setRequestNumber(
                (prevState) => (prevState -= multipleIds.length)
              );
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  function verifyMultiple() {
    Swal.fire({
      title: "Mark All As Verified?",
      html: `${multipleIds.length} request will be mark as verified. <br/> <br/> Do you want to proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        let response2;
        for (let i = 0; i < multipleIds.length; i++) {
          const response = await api.get(`/form/form/${multipleIds[i]}`);

          response2 = await api.patch(
            `/form/record-status/${response.data.recordID}`
          );
        }
        if (response2.status === 200) {
          Swal.fire({
            title: "All Requests Successfully Mark as Verified",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setMultipleIds([]);
              setRequestNumber(
                (prevState) => (prevState -= multipleIds.length)
              );
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  function archiveMultiple() {
    Swal.fire({
      title: "Archive All Requests?",
      html: `${multipleIds.length} request will be archived. <br/> <br/> Do you want to proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        let response;
        for (let i = 0; i < multipleIds.length; i++) {
          response = await api.patch(`/form/archive/${multipleIds[i]}`);
        }
        if (response.status === 200) {
          Swal.fire({
            title: "All Requests Successfully has been Archived",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setMultipleIds([]);
              setRequestNumber(
                (prevState) => (prevState -= multipleIds.length)
              );
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  }

  return (
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="mt-1 mr-5 transition-all duration-300 | md:ml-[90px] | xl:ml-[350px] ">
        <div className="p-1 mt-4 flex justify-center md:items-center | md:justify-end ">
          <a
            href="https://barangay564-forms.cyclic.app/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="mr-4 bg-dark-blue text-white px-3 py-2 rounded-xl cursor-pointer | text-sm | lg:text-base lg:px-5 lg:py-3 hover:opacity-70 ">
              Add New Request
            </button>
          </a>
        </div>
      </div>

      <div className="p-4 text-sm | lg:text-lg">
        <div className="flex flex-row">
          <div className="relative">
            <button
              className={`py-2 px-12 rounded-t-2xl hover:opacity-80 text-white  ${
                userStatusFilter === "Verified"
                  ? "bg-[#0D0F33]"
                  : "bg-[#0D0F33af]"
              }  `}
              onClick={(e) => setUserStatusFilter("Verified")}
            >
              Verified
            </button>
            {requestNumberVerified !== 0 && (
              <div className="absolute top-1 right-4 bg-red-500 text-xs text-bold text-main-off-white rounded-[50%] py-[5px] px-[10px]">
                {requestNumberVerified}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className={`py-2 px-12 rounded-t-2xl text-white bg-dark-blue hover:opacity-80 ${
                userStatusFilter === "Pending"
                  ? "bg-[#0D0F33]"
                  : "bg-[#0D0F33af]"
              }`}
              onClick={(e) => setUserStatusFilter("Pending")}
            >
              Pending
            </button>
            {requestNumberPending !== 0 && (
              <div className="absolute top-1 right-4 bg-red-500 text-xs text-bold text-main-off-white rounded-[50%] py-[5px] px-[10px]">
                {requestNumberPending}
              </div>
            )}
          </div>
        </div>
        <table className="text-center shadow-lg rounded-r-2xl rounded-bl-2xl mx-auto bg-white overflow-hidden | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              <td></td>
              <td className="p-4">Request Dates</td>
              <td className="p-4">Name</td>
              <td className="invisible absolute | md:visible md:static">
                Document
              </td>
              <td className="relative hover:cursor-pointer ">Record Status</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {multipleIds.length !== 0 && (
              <tr className="bg-[#f1f1f1] h-12">
                <td colSpan={6}>
                  <div className="flex flex-row justify-between items-center ml-8 mr-12">
                    <div>
                      <span className="text-gray-400 mr-4">
                        ({multipleIds.length} Selected)
                      </span>
                      <span
                        onClick={selectAll}
                        className="hover:cursor-pointer hover:bg-[#d6d5da]  p-2"
                      >
                        Select All
                      </span>
                    </div>
                    <div>
                      {userStatusFilter === "Pending" ? (
                        <span className="m-4 p-2">
                          <button data-title="MARK ALL AS VERIFIED">
                            <CheckCircleIcon
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
                              onClick={verifyMultiple}
                            />
                          </button>
                        </span>
                      ) : (
                        <span className="m-4 p-2">
                          <button data-title="MARK ALL AS PROCESSED">
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
                              onClick={processMultiple}
                            />
                          </button>
                        </span>
                      )}
                      <span className="p-2 m-4 ">
                        <button data-title="REJECT ALL REQUEST">
                          <CancelIcon
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
                            onClick={rejectMultiple}
                          />
                        </button>
                      </span>
                      {userStatusFilter === "Pending" && (
                        <span className=" p-2 m-4 ">
                          <button data-title="ARCHIVE ALL REQUEST">
                            <ArchiveIcon
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
                              onClick={archiveMultiple}
                            />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
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
              requests.map((request, index) => {
                return (
                  <tr
                    key={request._id}
                    className="border-b border-gray bg-white text-black"
                  >
                    <td className="p-2 py-5">
                      <input
                        type="checkbox"
                        className="lg:h-5 lg:w-5 align-middle"
                        onChange={handleCheckBox}
                        ref={(el) => (inputsRef.current[index] = el)}
                        id={request._id}
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
                    <td className="p-1 invisible absolute | md:visible md:static">
                      {request.document}
                    </td>
                    <td>{request.recordID.recordStatus}</td>
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

                      {request.recordID.recordStatus === "Verified" && (
                        <ReactToPrint
                          trigger={() => (
                            <button data-title="GENERATE DOCUMENT">
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
                          )}
                          content={() => componentsRef.current[index]}
                        />
                      )}

                      {request.recordID.recordStatus === "Verified" ? (
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
                      ) : (
                        <button data-title="MARK AS VERIFIED">
                          <CheckCircleIcon
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
                            onClick={(event) => markVerified(request)}
                          />
                        </button>
                      )}

                      {request.recordID.recordStatus === "Verified" &&
                      request.document === "Barangay ID" ? (
                        <IdTemplate
                          ref={(el) => (componentsRef.current[index] = el)}
                          requestDetails={request}
                        />
                      ) : (
                        <CertificateTemplate
                          ref={(el) => (componentsRef.current[index] = el)}
                          requestDetails={request}
                        />
                      )}

                      <button data-title="REJECT REQUEST">
                        <CancelIcon
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

                      {request.recordID.recordStatus === "Pending" && (
                        <button data-title="ARCHIVE REQUEST">
                          <ArchiveIcon
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
                            onClick={(event) => archiveRequest(request)}
                          />
                        </button>
                      )}
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
