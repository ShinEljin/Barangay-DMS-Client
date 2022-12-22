import FileBase from "react-file-base64";
import Swal from "sweetalert2";
import api from "../../../api/index";
import { useEffect } from "react";

function UploadImage({
  signatureTitle,
  signatureRole,
  signaturePhoto,
  setSignaturePhoto,
  inputID,
}) {
  async function handleSubmit(e) {
    e.preventDefault();
    const signatureDetails = {
      signaturePhoto,
      signatureRole,
    };
    try {
      const response = await api.post("/form/signature", signatureDetails);
      if (response.status === 201) {
        Swal.fire("Signature has been saved", "", "success");
      } else {
        Swal.fire("Something went wrong", "", "error");
      }
    } catch (error) {}
  }

  useEffect(() => {
    async function getSignature() {
      const response = await api.get(`/form/signature/${signatureRole}`);

      setSignaturePhoto(response.data.signaturePhoto);
    }

    getSignature();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <form
        className="w-[90%] bg-white rounded-lg border-2 border-white p-[20px] text-center "
        onSubmit={handleSubmit}
      >
        <p className="text-left text-sm mb-1">[{signatureTitle}]</p>
        <div className="flex flex-col justify-center items-center bg-[#e1e1e1] p-6 rounded-tl-2xl rounded-tr-2xl border-2 border-black">
          <img src={signaturePhoto} alt="Signature" className="w-full h-full" />
        </div>
        <div className="bg-white border-l border-l-black border-r border-r-black border-b border-b-black rounded-bl-2xl rounded-br-2xl p-4 w-full flex justify-center items-center">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setSignaturePhoto(base64);
              console.log(signaturePhoto);
            }}
          />
        </div>
        <div className="flex justify-end mr-2">
          <button
            type="button"
            className=" text-[#ff0000] font-semibold hover:opacity-70 mt-4 mr-4"
            onClick={(e) => setSignaturePhoto("")}
          >
            Remove
          </button>
          <button
            type="submit"
            className=" text-white font-semibold px-4 py-2 mt-4 hover:opacity-70 rounded-lg bg-[#033AA9]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
