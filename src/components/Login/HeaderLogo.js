import { useNavigate } from "react-router-dom";

function HeaderLogo() {
  const navigate = useNavigate();

  function backHome() {
    navigate("/");
  }

  return (
    <div className="flex justify-between absolute w-full font-montserrat tracking-wide z-10 p-8">
      <div
        className="flex items-center font-semibold hover:cursor-pointer"
        onClick={backHome}
      >
        <img
          className="h-20 | md:h-24"
          src="https://barangaybucket.s3.ap-southeast-1.amazonaws.com/Barangay_Seal.png"
          alt="Barangay_Seal"
        />
        <span className="invisible md:visible font-montserrat ml-3 text-xl text-white">
          BARANGAY <br />
          MANAGEMENT <br />
          SYSTEM
        </span>
      </div>
      <img
        className="h-20 | md:h-24"
        src="https://barangaybucket.s3.ap-southeast-1.amazonaws.com/Manila_Seal.png"
        alt="Manila_Seal"
      />
    </div>
  );
}

export default HeaderLogo;
