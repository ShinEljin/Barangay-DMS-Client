import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function MastersList({ mastersListOpen, setMastersListOpen }) {
  const [csvFile, setCsvFile] = useState(null);

  const submitCsv = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", csvFile);

    // Use axios to post the file to a server...
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center m-5 mt-0 rounded-xl max-w-sm relative ">
      <ClearIcon
        className="absolute top-5 right-5 hover:cursor-pointer hover:opacity-60"
        onClick={() => setMastersListOpen(!mastersListOpen)}
      />
      <div className="text-center text-2xl font-bold py-4">Masters List</div>

      <form onSubmit={submitCsv}>
        <div>
          <input
            type="file"
            onChange={(event) => {
              setCsvFile(event.target.files[0]);
            }}
          />
        </div>

        <div className="flex justify-end m-4 mb-7">
          <button
            type="submit"
            className="bg-dark-blue text-white px-4 py-2 rounded-md hover:bg-slate-500 hover:text-dark-blue"
          >
            Upload File
          </button>
        </div>
      </form>
    </div>
  );
}

export default MastersList;
