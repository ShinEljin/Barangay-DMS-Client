import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import api from "../../../api/index";

function SmsNotif({ smsNotifOpen, setSmsNotifOpen }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function getSmsConfig() {
      const response = await api.get("/form/sms");

      setChecked(response.data.configSetting);
    }

    getSmsConfig();
  }, []);

  async function saveSms(e) {
    e.preventDefault();

    Swal.fire({
      title: "Enter password",
      input: "password",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        if (password !== "qwerty") {
          Swal.showValidationMessage("incorrect password");
        } else {
          const option = {
            option: checked,
          };

          await api.post("/form/sms", option);

          if (checked === true) {
            return "SMS Notification has been turned on!";
          } else {
            return "SMS Notification has been turned off!";
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: result.value,
          icon: "success",
        });
      }
    });
  }

  return (
    <div className="bg-white flex flex-col justify-center m-5 mt-0 rounded-xl max-w-sm relative">
      <ClearIcon
        className="absolute top-5 right-5 hover:cursor-pointer hover:opacity-60"
        onClick={() => setSmsNotifOpen(!smsNotifOpen)}
      />
      <div className="text-center text-2xl font-bold py-4">
        SMS Notification
      </div>
      <div className="text-center pb-4">
        <img
          alt="Lock"
          src="https://thumbs.dreamstime.com/b/print-148080907.jpg"
          className="text-center h-44 w-44 mx-auto"
        />
      </div>

      <form onSubmit={saveSms}>
        <div className="flex justify-center items-center">
          <p>SMS Notification</p>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>

        <div className="flex justify-end m-4 mb-7">
          <button
            type="submit"
            className="bg-dark-blue text-white px-4 py-2 rounded-md hover:bg-slate-500 hover:text-dark-blue"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default SmsNotif;
