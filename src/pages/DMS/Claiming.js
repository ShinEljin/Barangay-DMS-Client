//MUI ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

//MUI COMPONENTS
import Pagination from "@mui/material/Pagination";

//REACT AND NPM PACKAGES
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

//INTERNAL MODULES
import api from "../../api/index";
import SwalLoading from "../../components/DMS/SwalLoading";
import SwalHTML from "../../components/DMS/SwalHTML";

function Claiming() {
  //SWAL
  const { startLoading, stopLoading } = SwalLoading();
  const { requestInfo, recordInfo } = SwalHTML();

  //REFS
  const inputsRef = useRef([]);

  //VARIABLES
  const [requests, setRequests] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [multipleIds, setMultipleIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  //FETCHING REQUESTS
  useEffect(() => {
    async function getRequests() {
      const response = await api.get("/form/processed");

      setRequests(response.data);
      setRequestNumber(response.data.length);
    }

    getRequests();
  }, [requestNumber]);

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

  function claimedRequest(request) {
    Swal.fire({
      title: "Mark As Claimed?",
      text: "Does the document have been claimed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startLoading();
        const response = await api.patch(`/form/claimed/${request._id}`);

        if (response.status === 200) {
          Swal.fire({
            title: "Request Successfully Mark as Claimed",
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

  function deselectAll(e) {
    setMultipleIds([]);
    for (let i = 0; i < inputsRef.current.length; i++) {
      if (inputsRef.current[i] !== null) {
        inputsRef.current[i].checked = false;
      }
    }
  }

  function claimedMultiple() {
    Swal.fire({
      title: "Mark All As Claimed?",
      html: `${multipleIds.length} request will be mark as claimed. <br/> <br/> Do you want to proceed?`,
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
          response = await api.patch(`/form/claimed/${multipleIds[i]}`);
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

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="p-4 text-sm mt-2 | lg:text-lg">
        <table className="text-left shadow-lg rounded-2xl  mx-auto bg-white overflow-hidden | md:w-full transition-all duration-300">
          <thead className="text-white bg-dark-blue">
            <tr>
              <td></td>
              <td className="p-4 pl-0">Processed Date</td>
              <td className="p-4 pl-0">Name</td>
              <td>Document</td>
              <td className="invisible absolute | md:visible md:static">
                Purpose
              </td>
              <td className="text-center">Action</td>
            </tr>
          </thead>

          <tbody className="border-b border-gray bg-white text-black">
            {multipleIds.length !== 0 && (
              <tr className="bg-[#f1f1f1] h-12">
                <td colSpan={6}>
                  <div className="flex flex-row justify-between items-center ml-8 mr-12">
                    <div>
                      <span className="text-gray-400 mr-4">
                        ({multipleIds.length} Selected)
                      </span>
                      <span
                        className="hover:cursor-pointer hover:bg-[#d6d5da]  p-2"
                        onClick={selectAll}
                      >
                        Select All
                      </span>
                      <span
                        className="hover:cursor-pointer hover:bg-[#d6d5da]  p-2"
                        onClick={deselectAll}
                      >
                        Deselect All
                      </span>
                    </div>
                    <div>
                      <span className="m-4 p-2">
                        <button data-title="MARK ALL AS VERIFIED">
                          <LibraryAddCheckIcon
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
                            onClick={claimedMultiple}
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {requests && requests.length === 0 && (
              <tr>
                <td className="align-middle p-2 py-5 text-center" colSpan={8}>
                  NO REQUESTS FOUND!
                </td>
              </tr>
            )}
            {!requests && startLoading()}
            {requests && stopLoading()}
            {requests &&
              requests
                .slice(
                  currentPage * recordsPerPage - recordsPerPage,
                  currentPage * recordsPerPage
                )
                .map((request, index) => {
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
                      <td>{request.processedDate}</td>
                      <td>
                        {request.recordID.firstName +
                          " " +
                          request.recordID.middleName +
                          " " +
                          request.recordID.lastName}
                      </td>
                      <td>{request.document}</td>
                      <td className="invisible absolute | md:visible md:static">
                        {request.purpose === "Others"
                          ? request.specify
                          : request.purpose}
                      </td>
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
                            onClick={(event) => getInfo(request)}
                          />
                        </button>
                        <button data-title="MARK AS CLAIMED">
                          <LibraryAddCheckIcon
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
                            onClick={(event) => claimedRequest(request)}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 mb-4 mr-4">
          {requests && (
            <Pagination
              className="bg-red"
              count={Math.ceil(requests.length / recordsPerPage)}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Claiming;
