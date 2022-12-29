import { forwardRef, useEffect, useState } from "react";
import api from "../../api/index";

const CertificateTemplate = forwardRef((props, ref) => {
  const [secretarySignaturePhoto, setSecretarySignaturePhoto] = useState("");
  const [chairmanSignaturePhoto, setChairmanSignaturePhoto] = useState("");

  const { lastName, middleName, firstName, bdate, address } =
    props.requestDetails.recordID;

  const age = new Date().getFullYear() - bdate.split("-")[0];
  const { purpose } = props.requestDetails;
  let middleInitial;

  if (middleName !== "") {
    middleInitial = middleName.slice(0, 1);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = new Date().getDate();
  const month = monthNames[new Date().getMonth()];
  const year = new Date().getFullYear();

  useEffect(() => {
    async function getSignature() {
      const chairmanSigantureDetails = await api.get(
        "/form/signature/Chairman"
      );
      const secretarySigantureDetails = await api.get(
        "/form/signature/Secretary"
      );

      setChairmanSignaturePhoto(chairmanSigantureDetails.data.signaturePhoto);

      setSecretarySignaturePhoto(secretarySigantureDetails.data.signaturePhoto);
    }

    getSignature();
  }, []);
  return (
    <div className="hidden">
      <div
        className="max-w-[816px] m-auto p-[30px] border-[1px] border-[#eee] shadow-lg font-montserrat text-base leading-6 h-[1056px] overflow-hidden bg-template-bg bg-no-repeat bg-[length:780px] bg-[16px_200px] bg-white/80 bg-blend-lighten "
        ref={ref}
      >
        <header className="flex flex-row items-center justify-center gap-4 mb-4 mt-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ph_seal_ncr_manila.svg/1200px-Ph_seal_ncr_manila.svg.png"
            alt="manila-seal"
            width="100px"
            height="100px"
          />
          <div className="header-text | text-center">
            <h2 className="font-bold text-[1.5rem] my-[0.4rem] font-montserrat">
              BARANGAY 564 ZONE 55 DISTRICT IV
            </h2>
            <h2 className="font-bold text-[1.5rem] my-[0.4rem] font-montserrat">
              SAMAR ST. SAMPALOC, MANILA
            </h2>
            <h2 className="font-bold text-[1.5rem] my-[0.4rem] font-montserrat">
              OFFICE OF THE BARANGAY CHAIRMAN
            </h2>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Barangay.svg"
            alt="barangay-seal"
            width="100px"
            height="100px"
          />
        </header>

        <div className="flex flex-row border-t-black border-t-[3px]">
          <div className="flex-[30%] py-[0.7rem]">
            <h1 className="font-bold text-[2rem] font-montserrat">
              BARANGAY <br />
              OFFICIALS
            </h1>
            <div className="my-8">
              <h3 className="font-bold text-[1.3rem] font-montserrat">
                JOECEL ALBERTO
              </h3>
              <h5 className="font-bold text-[1rem] ml-5 font-montserrat">
                PUNONG BARANGAY
              </h5>
            </div>
            <div className="my-8">
              <h3 className="font-bold text-[1.3rem] font-montserrat">
                KAGAWAD
              </h3>
              <h5 className="font-bold text-[1rem] font-montserrat">
                STEVENOT DE LEON
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                RODOLFO JOSE
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                ALFONSO DEMILIO JR
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                JOHNNY FERNANDEZ
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                CAMILO MEMPIN
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                ANTONIO FABIA
              </h5>
              <h5 className="font-bold text-[1rem] font-montserrat">
                BENISON ACAYA
              </h5>
            </div>

            <div className="my-8">
              <h5 className="font-bold text-[1rem] font-montserrat">
                OSMALETH SENANGELO
              </h5>
              <h5 className="font-bold text-[1rem] ml-5 font-montserrat">
                SK CHAIRMAN
              </h5>
            </div>

            <div className="my-8">
              <h5 className="font-bold text-[1rem] font-montserrat">
                EMILIA SEVANDRA
              </h5>
              <h5 className="font-bold text-[1rem] ml-5 font-montserrat">
                TREASURER
              </h5>
            </div>

            <div className=" my-8">
              <h5 className="font-bold text-[1rem] font-montserrat">
                REGINA ESBER
              </h5>
              <h5 className="font-bold text-[1rem] ml-5 font-montserrat">
                SECRETARY
              </h5>
            </div>
          </div>

          <div className="border-l-black border-l-[3px] flex-[70%] flex-col pl-5 pt-4">
            <h1 className="my-4 pr-20 mb-8 text-center font-bold text-[2rem] font-montserrat">
              CERTIFICATION
            </h1>
            <p className="right-item mb-8 my-[1rem] pr-[5rem] font-sans ">
              This to certify that Mr / Mrs{" "}
              <b className="font-montserrat">
                {firstName.toUpperCase()}{" "}
                {middleInitial && middleInitial.toUpperCase()}
                {". "}
                {lastName.toUpperCase()}, {age} yrs old{" "}
              </b>
              single/married. A bonafide resident of this barangay{" "}
              <b className="font-montserrat">
                {address.toUpperCase() + " ST. SAMPALOC, MANILA"}
              </b>
            </p>
            <p className="mb-4 pr-20 font-sans">
              That he/she is a person of good moral character and has no
              derogatory record within the expand of my jurisdiction.
            </p>
            <br />
            <p className="mb-8 pr-20 font-sans ">
              This certification is being ssued upon the request of the person
              mentioned above for{" "}
              <b className="font-montserrat">{purpose.toUpperCase()}</b>
            </p>
            <p className="my-4 pr-20 font-sans ">
              Done in the City of Manila this {day}
              <sup>th</sup> day of {month} {year}
            </p>
            <br />
            <br />
            <p className="my-4 pr-20 text-[10px] font-sans">
              NOTE: NOT VALID WITHOUT BARANGAY SEAL <br />
              BARANGAY CERTIFICATION NO. 1489
            </p>

            <div className="flex flex-row items-center justify-between pr-10 pl-8 mt-28">
              <div className="text-center signature-item relative">
                {secretarySignaturePhoto !== "" && (
                  <img
                    src={secretarySignaturePhoto}
                    alt=""
                    width="100px"
                    height="50px"
                    className="absolute bottom-6 right-6"
                  />
                )}

                <h4 className="font-bold">Regina Esber</h4>
                <p>Barangay Secretary</p>
              </div>
              <div className="text-center relative">
                {chairmanSignaturePhoto !== "" && (
                  <img
                    src={chairmanSignaturePhoto}
                    alt=""
                    width="100px"
                    height="50px"
                    className="absolute bottom-6 right-6"
                  />
                )}

                <h4 className="font-bold">Joecel P. Alberto</h4>
                <p>Punong Barangay</p>
              </div>
            </div>

            <p className="invisible">1</p>
            <p className="invisible">1</p>
            <p className="invisible">1</p>
            <p className="invisible">1</p>
            <p className="invisible">1</p>
            <p className="invisible">1</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;
