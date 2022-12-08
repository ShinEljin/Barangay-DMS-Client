import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import UploadImage from "./UploadImage";

function Signature({ signatureOpen, setSignatureOpen }) {
  const [chairmanSignature, setChairmanSignature] = useState(null);
  const [secretarySignature, setSecretarySignature] = useState(null);

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
        signatureRole={chairmanSignature}
        setSignatureRole={setChairmanSignature}
        inputID="chairmanSignature"
      />
      <UploadImage
        signatureTitle="Secretary Signature"
        signatureRole={secretarySignature}
        setSignatureRole={setSecretarySignature}
        inputID="secretarySignature"
      />
    </div>
  );
}

export default Signature;
