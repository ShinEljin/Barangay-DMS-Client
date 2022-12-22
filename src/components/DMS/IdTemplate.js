import { forwardRef, useEffect, useState } from "react";
import api from "../../api/index";

const IdTemplate = forwardRef((props, ref) => {
  const [chairmanSignaturePhoto, setChairmanSignaturePhoto] = useState("");

  const {
    lastName,
    middleName,
    firstName,
    bdate,
    address,
    person2Notif,
    person2NotifPhone,
  } = props.requestDetails.recordID;

  let middleInitial;

  if (middleName !== "") {
    middleInitial = middleName.slice(0, 1);
  }

  useEffect(() => {
    async function getSignature() {
      const chairmanSigantureDetails = await api.get(
        "/form/signature/Chairman"
      );

      setChairmanSignaturePhoto(chairmanSigantureDetails.data.signaturePhoto);
    }

    getSignature();
  }, []);

  return (
    <div className="hidden">
      <div
        className="max-w-[816px] m-auto p-[5px] pt-8 border-[1px] border-[#eee] shadow-lg font-montserrat text-base leading-6 h-[1056px] overflow-hidden bg-no-repeat bg-[length:780px] bg-[16px_200px] bg-white/80 bg-blend-lighten flex justify-center flex-row gap-1 "
        ref={ref}
      >
        <div className="flex flex-col h-[227px] w-[377px] bg-[#123986] leading-[0.8rem] relative mb-2">
          <div className="absolute bg-[#599ADB] w-full h-1 top-6" />
          <div className="absolute bg-[#599ADB] w-full h-1 bottom-4" />
          <div className="flex w-full px-10 py-[0.35rem] relative z-10">
            <img
              alt="Barangay"
              src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Barangay.svg"
              className="h-10 w-10"
            />
            <div className="text-center text-[#E5D00C] text-[0.5rem] tracking-tighter font-extrabold w-full">
              <p>REPUBLIC OF THE PHILIPPINES</p>
              <p>CITY OF MANILA</p>
              <p>BARANGAY 546, ZONE 55, DISTRICT IV</p>
            </div>
            <img
              alt="Manila"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ph_seal_ncr_manila.svg/1200px-Ph_seal_ncr_manila.svg.png"
              className="h-10 w-10"
            />
          </div>
          <div className="flex flex-col bg-[#599ADB] w-full h-[8.5rem] relative">
            <img
              alt="Manila"
              src="https://i.imgur.com/k1UjO0D.png"
              className="absolute bottom-0 opacity-50"
            />
            <div className="relative flex justify-center">
              <div className="flex relative mt-2 z-10">
                <div className="flex flex-col leading-[0.35rem]">
                  <label className="text-[0.5rem] font-bold tracking-tighter mb-[2px]">
                    NAME
                  </label>
                  <p className="w-[170px] h-[17px] mb-2 bg-white text-[0.7rem] pl-[3px] pt-[0.5rem] ">
                    {firstName} {middleInitial} {lastName}
                  </p>
                  <label className="text-[0.5rem] font-bold tracking-tighter mb-[2px]">
                    ADDRESS
                  </label>
                  <p className="w-[170px] h-[17px] mb-2 bg-white text-[0.6rem] pl-[3px] pt-[0.5rem]">
                    {address} St. Sampaloc, Mla.
                  </p>
                  <label className="text-[0.5rem] font-bold tracking-tighter mb-[2px]">
                    BIRHDAY
                  </label>
                  <p className="w-[170px] h-[17px] mb-2 bg-white text-[0.7rem] pl-[3px] pt-[0.5rem]">
                    {bdate}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center ml-10">
                  <div className="h-[80px] w-[80px] bg-white flex justify-center items-center">
                    Image
                  </div>
                  <p className="text-[0.5rem] font-bold tracking-tighter mt-3">
                    Signature
                  </p>
                </div>
              </div>
            </div>
            <div className="flex z-10 px-2">
              <label className="text-[0.5rem] font-bold  tracking-tighter">
                BARANGAY RESIDENT <br /> IDENTIFICATION NO.
              </label>
              <p className="w-[70px] h-[20px] bg-white ml-1"></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[227px] w-[377px] bg-[#123986] leading-[0.8rem] relative">
          <div className="absolute bg-[#599ADB] w-full h-1 top-6" />
          <div className="flex flex-col bg-[#599ADB] w-full h-[9rem] relative mt-12">
            <div className="flex justify-around mt-1">
              <div className="bg-white h-10 w-44">
                <p className="text-[0.4rem] tracking-tighter font-bold text-center">
                  IN CASE OF EMERGENCY, PLEAST NOTIFY
                </p>

                <p className="text-[0.6rem] tracking-tighter text-center">
                  {person2Notif}
                </p>
                <p className="text-[0.5rem] tracking-tighter text-center">
                  {person2NotifPhone}
                </p>
              </div>
              <img
                alt="Manila"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sangguniang_Kabataan_logo.svg/1024px-Sangguniang_Kabataan_logo.svg.png"
                className="h-10 w-10"
              />
              <img
                alt="Manila"
                src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Barangay.svg"
                className="h-10 w-10"
              />
            </div>

            <div className="flex justify-around tracking-tight">
              <div className="text-center">
                <h2 className="text-[#E5D00C] text-[0.5rem] font-extrabold leading-[0.1] my-2">
                  BARANGAY KAGAWAD
                </h2>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  STEVENOT DE LEON
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  RODOLFO JOSE
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  ALFONSO EMILLO JR.
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  JOHNNY FERNANDEZ
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  CAMILLO MEMPHIN
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  ANTONIO FABIA
                </p>
                <p className="text-[0.45rem] mt-[-5px] font-semibold">
                  ANTONIO JOSE
                </p>
                <br />
                <p className="text-[0.45rem] font-semibold mt-[-5px]">
                  EMILIA SEVANDRA
                </p>
                <p className="text-[0.45rem] font-semibold mt-[-5px]">
                  LUISITO CASTILLO
                </p>
              </div>
              <div>
                <div className="text-center">
                  <h2 className="text-[0.5rem] font-extrabold leading-[0.1] my-2">
                    OSMALETH SENANGEL
                  </h2>
                  <p className="text-[#E5D00C] text-[0.45rem] mt-[-5px] font-semibold">
                    SK CHAIRMAN
                  </p>
                  <h2 className="text-[#E5D00C] text-[0.6rem] mt-[2px] font-extrabold leading-[0.1] mb-2">
                    SK COUNCIL
                  </h2>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    ANGELICA DOMINGO
                  </p>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    MA. CARBY LEONOR
                  </p>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    JOHNLLOYD PANGAN
                  </p>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    ROSEWELL GALINGO
                  </p>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    AILEEN MENDIGUARIN
                  </p>
                  <p className="text-[0.45rem] mt-[-5px] font-semibold leading-[12px]">
                    JEREMY ROBERT MEDEL
                  </p>
                  <p className="text-[0.45rem] font-semibold mt-[-5px] leading-[12px]">
                    KIRK RUZZEL MARQUEZ
                  </p>
                  <p className="text-[0.45rem] font-semibold mt-[-5px] leading-[12px]">
                    DENZEL JOY SERRANO
                  </p>
                  <p className="text-[0.45rem] font-semibold mt-[-5px] leading=[0]">
                    JOHN MICHEAL DEMILLO
                  </p>
                </div>
              </div>
              <div className="text-center mt-10 relative">
                {chairmanSignaturePhoto !== "" && (
                  <img
                    src={chairmanSignaturePhoto}
                    alt=""
                    width="50px"
                    height="25px"
                    className="absolute bottom-12 right-6"
                  />
                )}
                <div className="bg-black w-full h-[0.15rem]"></div>
                <h2 className="text-[#E5D00C] text-[0.6rem] mt-[5px] font-extrabold tracking-tighter leading-[5px]">
                  JOECEL P. ALBERRTO
                </h2>
                <h2 className="text-[#E5D00C] text-[0.4rem] mt-[2px] font-extrabold tracking-tighter leading-[5px]">
                  PUNONG BARANGAY
                </h2>
                <p className="text-[0.4rem] w-24 text-right leading-[1] mt-4">
                  If lost kindly return to Barangay Hall Barangay 546 Samar St.
                  Sampaloc, Manila
                </p>
              </div>
            </div>
          </div>

          <div className="text-center tracking-tighter font-roboto font-bold text-2xl">
            <span className="text-[#E5D00C] font-roboto">I</span>3ATANG{" "}
            <span className="text-[#E5D00C] font-roboto">M</span>AYNILA
          </div>
        </div>
      </div>
    </div>
  );
});

export default IdTemplate;
