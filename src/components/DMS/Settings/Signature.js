import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadImage from "./UploadImage";

function Signature({ signatureOpen, setSignatureOpen }) {
  const [chairmanSignatureRole] = useState("Chairman");
  const [chairmanSignaturePhoto, setChairmanSignaturePhoto] = useState(null);
  const [secretarySignatureRole] = useState("Secretary");
  const [secretarySignaturePhoto, setSecretarySignaturePhoto] = useState(null);

  return (
    <div className="bg-white flex flex-col justify-center m-5 mt-0 rounded-xl max-w-sm relative">
      <KeyboardArrowDownIcon
        fontSize="large"
        className="absolute top-4 right-4 hover:cursor-pointer "
        onClick={() => setSignatureOpen(!signatureOpen)}
      />
      <div
        className="text-center text-2xl font-bold py-4 hover:bg-[#0D89C77f] hover:rounded-t-xl hover:cursor-pointer"
        onClick={() => setSignatureOpen(!signatureOpen)}
      >
        Upload Signature
      </div>
      <UploadImage
        signatureTitle="Chairman Signature"
        signatureRole={chairmanSignatureRole}
        signaturePhoto={chairmanSignaturePhoto}
        setSignaturePhoto={setChairmanSignaturePhoto}
        inputID="chairmanSignature"
      />
      <UploadImage
        signatureTitle="Secretary Signature"
        signatureRole={secretarySignatureRole}
        signaturePhoto={secretarySignaturePhoto}
        setSignaturePhoto={setSecretarySignaturePhoto}
        inputID="secretarySignature"
      />
    </div>
  );
}

export default Signature;
