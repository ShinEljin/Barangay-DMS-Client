import "./CertificateTemplate.css";
import { forwardRef } from "react";

const CertificateTemplate = forwardRef((props, ref) => {
  const { lastName, middleName, firstName, age, address } =
    props.requestDetails.recordID;

  const { purpose } = props.requestDetails;
  let middleInitial;

  if (middleName !== "") {
    middleInitial = middleName.slice(0, 1);
  }
  // if (middleName.includes(" ")) {
  //   middleInitial =
  //     middleName.split(" ")[0].slice(0, 1) +
  //     middleName.split(" ")[1].slice(0, 1);
  // }

  // const lastName = props.requestDetails.recordID.lastName;
  // const middleInitial = "P";
  // const firstName = "Raphael";
  // const age = "20";
  // const address = "1047 Samar St. Sampaloc, Manila";
  // const purpose = "Financial Assistance";

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
  const year = new Date().getFullYear;

  return (
    <div className="hidden">
      <div className="container" ref={ref}>
        <header className="header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ph_seal_ncr_manila.svg/1200px-Ph_seal_ncr_manila.svg.png"
            alt="manila-seal"
            width="100px"
            height="100px"
          />
          <div className="header-text">
            <h2>BARANGAY 564 ZONE 55 DISTRICT IV</h2>
            <h2>SAMAR ST. SAMPALOC, MANILA</h2>
            <h2>OFFICE OF THE BARANGAY CHAIRMAN</h2>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Barangay.svg"
            alt="barangay-seal"
            width="100px"
            height="100px"
          />
        </header>

        <div className="body">
          <div className="body-left">
            <h1>
              BARANGAY <br />
              OFFICIALS
            </h1>
            <div className="left-item">
              <h3>JOECEL ALBERTO</h3>
              <h5>PUNONG BARANGAY</h5>
            </div>
            <div className="left-item">
              <h3>KAGAWAD</h3>
              <h5>STEVENOT DE LEON</h5>
              <h5>RODOLFO JOSE</h5>
              <h5>ALFONSO DEMILIO JR</h5>
              <h5>JOHNNY FERNANDEZ</h5>
              <h5>CAMILO MEMPIN</h5>
              <h5>ANTONIO FABIA</h5>
              <h5>BENISON ACAYA</h5>
            </div>

            <div className="left-item">
              <h5>OSMALETH SENANGELO</h5>
              <h5>SK CHAIRMAN</h5>
            </div>

            <div className="left-item">
              <h5>EMILIA SEVANDRA</h5>
              <h5>TREASURER</h5>
            </div>

            <div className="left-item">
              <h5>REGINA ESBER</h5>
              <h5>SECRETARY</h5>
            </div>
          </div>

          <div className="body-right">
            <h1 className="right-item right-heading">CERTIFICATION</h1>
            <p className="right-item">
              This to certify that Mr / Mrs
              <b>
                {" " + firstName.toUpperCase()}{" "}
                {middleInitial && middleInitial.toUpperCase()}{" "}
                {lastName.toUpperCase()}, {age + " "}
                yrs old{" "}
              </b>
              single/married. A bonafide resident of this barangay{" "}
              <b>{address.toUpperCase()}</b>
            </p>
            <p className="right-item">
              That he/she is a person of good moral character and has no
              derogatory record within the expand of my jurisdiction.
            </p>
            <br />
            <p className="right-item">
              This certification is being ssued upon the request of the person
              mentioned above for <b>{purpose.toUpperCase()}</b>
            </p>
            <p className="right-item">
              Done in the City of Manila this {day}
              <sup>th</sup> day of {month} {year}
            </p>
            <br />
            <br />
            <p className="right-item note">
              NOTE: NOT VALID WITHOUT BARANGAY SEAL <br />
              BARANGAY CERTIFICATION NO. 1489
            </p>

            <div className="signatures">
              <div className="signature-item">
                <img
                  src="https://barangaybucket.s3.ap-southeast-1.amazonaws.com/signature.png"
                  alt=""
                  width="100px"
                  height="50px"
                />
                <h4>Regina Esber</h4>
                <p>Barnagay Secretary</p>
              </div>
              <div className="signature-item">
                <img
                  src="https://barangaybucket.s3.ap-southeast-1.amazonaws.com/signature.png"
                  alt=""
                  width="100px"
                  height="50px"
                />
                <h4>Joecel P. Alberto</h4>
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
