import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import UploadImage from "./UploadImage";

function Signature({ signatureOpen, setSignatureOpen }) {
  const [chairmanSignatureRole] = useState("Chairman");
  const [chairmanSignaturePhoto, setChairmanSignaturePhoto] = useState(null);
  const [secretarySignatureRole] = useState("Secretary");
  const [secretarySignaturePhoto, setSecretarySignaturePhoto] = useState(null);

  return (
    <div className="bg-white flex flex-col justify-center m-5 mt-0 rounded-xl max-w-sm relative">
      <ClearIcon
        className="absolute top-5 right-5 hover:cursor-pointer opacity-30 hover:opacity-80"
        onClick={() => setSignatureOpen(!signatureOpen)}
      />
      <div className="text-center text-2xl font-bold py-4">
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
