import { useState } from "react";

import SettingsItem from "../../components/DMS/Settings/SettingsItem";
import ChangePassword from "../../components/DMS/Settings/ChangePassword";
import SmsNotif from "../../components/DMS/Settings/SmsNotif";
import MastersList from "../../components/DMS/Settings/MastersList";
import Signature from "../../components/DMS/Settings/Signature";
import Validation from "../../components/DMS/Settings/Validation";

function Settings() {
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [smsNotifOpen, setSmsNotifOpen] = useState(false);
  const [validationOpen, setValidationOpen] = useState(false);
  const [mastersListOpen, setMastersListOpen] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);

  return (
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="flex flex-col justify-start items mt-6">
        {/* CHANGE PASS SETTING */}
        {!changePassOpen ? (
          <SettingsItem
            itemOpen={changePassOpen}
            setItemOpen={setChangePassOpen}
            text="Change Password"
          />
        ) : (
          <ChangePassword
            changePassOpen={changePassOpen}
            setChangePassOpen={setChangePassOpen}
          />
        )}

        {/* SMS NOTIF SETTING */}
        {!smsNotifOpen ? (
          <SettingsItem
            itemOpen={smsNotifOpen}
            setItemOpen={setSmsNotifOpen}
            text="SMS Notification"
          />
        ) : (
          <SmsNotif
            smsNotifOpen={smsNotifOpen}
            setSmsNotifOpen={setSmsNotifOpen}
          />
        )}

        {/* VALIDATION SETTING */}
        {!validationOpen ? (
          <SettingsItem
            itemOpen={validationOpen}
            setItemOpen={setValidationOpen}
            text="Validation"
          />
        ) : (
          <Validation
            validationOpen={validationOpen}
            setValidationOpen={setValidationOpen}
          />
        )}

        {/* MASTERSLIST SETTING */}
        {!mastersListOpen ? (
          <SettingsItem
            itemOpen={mastersListOpen}
            setItemOpen={setMastersListOpen}
            text="Masters List"
          />
        ) : (
          <MastersList
            mastersListOpen={mastersListOpen}
            setMastersListOpen={setMastersListOpen}
          />
        )}

        {/* SIGNATURE SETTING */}
        {!signatureOpen ? (
          <SettingsItem
            itemOpen={signatureOpen}
            setItemOpen={setSignatureOpen}
            text="Signature"
          />
        ) : (
          <Signature
            signatureOpen={signatureOpen}
            setSignatureOpen={setSignatureOpen}
          />
        )}
      </div>
    </div>
  );
}
export default Settings;
