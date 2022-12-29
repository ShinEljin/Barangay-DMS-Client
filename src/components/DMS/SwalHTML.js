function SwalHTML() {
  function requestInfo(request) {
    return `<div class="text-left">
   <strong>Request ID:</strong> ${request._id} <br/>
   <strong>Request Date:</strong> ${request.requestDate} <br/>
   ${
     request.processedDate
       ? `<strong>Processed Date:</strong> ${request.processedDate} <br/>`
       : ""
   }
   ${
     request.claimedDate
       ? `<strong>Claimed Date:</strong> ${request.claimedDate} <br/>`
       : ""
   }
   ${
     request.rejectedDate
       ? `<strong>Rejected Date:</strong> ${request.rejectedDate} <br/>`
       : ""
   }
   <strong>Document:</strong> ${request.document} <br/>
   <strong>Purpose:</strong> ${request.purpose} <br/>
   ${
     request.specify !== ""
       ? `<strong>Specify:</strong> ${request.specify} <br/>`
       : ""
   }
 
    <br/> 
  </div>`;
  }

  function recordInfo(record) {
    return `  <div  class="text-left">
    <strong>Record ID:</strong> ${record._id} <br/>
      <strong>Fullname:</strong> ${
        record.firstName + " " + record.middleName + " " + record.lastName
      } <br/>
      <strong>Status:</strong> ${record.recordStatus} <br/>
      <strong>Address:</strong> ${record.address} <br/>
      <strong>Phone:</strong> ${record.phone} <br/>
      <strong>Email:</strong> ${record.email} <br/>
      <strong>Birth Date (yyyy/mm/dd): </strong> ${record.bdate} <br/>
      <strong>Gender:</strong> ${record.gender} <br/>
      ${
        record.person2Notif
          ? `<strong>Person To Notify:</strong> ${record.person2Notif} <br/>`
          : ""
      }
      ${
        record.relationship
          ? `<strong>Relationship:</strong> ${record.relationship} <br/>`
          : ""
      }
      ${
        record.person2NotifPhone
          ? `<strong>Person To Notify (Number):</strong> ${record.person2NotifPhone} <br/>`
          : ""
      }
      ${
        record.schoolAttainment
          ? `  <strong>School Attainment:</strong> ${record.schoolAttainment} <br/>`
          : ""
      }
      ${
        record.yearsOfResidency
          ? `<strong>Years of Residency:</strong> ${record.yearsOfResidency} <br/>`
          : ""
      }
 
      ${
        record.recordStatus === "Pending"
          ? `<strong>Proof:</strong> <br/>
          <img src=${`https://barangaybucket.s3.ap-southeast-1.amazonaws.com/${record._id}-proof1`} alt="no-front-page-found" /> <br/>
          <img src=${`https://barangaybucket.s3.ap-southeast-1.amazonaws.com/${record._id}-proof2`} alt="no-back-page-found" /> <br/>
            `
          : ""
      }
      

     </div>`;
  }
  return { requestInfo, recordInfo };
}

export default SwalHTML;
