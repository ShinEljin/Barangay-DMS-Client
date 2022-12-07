import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import Switch from "@mui/material/Switch";
import api from "../../api/index";
import Swal from "sweetalert2";
import {
  isPasswordStrong,
  isPasswordsMatch,
} from "../../validation/validation";

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [smsNotifOpen, setSmsNotifOpen] = useState(false);

  const [checked, setChecked] = useState(null);

  useEffect(() => {
    async function getSmsConfig() {
      const response = await api.get("/form/sms");

      setChecked(response.data.smsConfig);
    }

    getSmsConfig();
  }, []);

  async function savePassword(e) {
    e.preventDefault();

    setError(null);

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      return setError("Please input all fields");
    }
    if (!isPasswordsMatch(newPassword, confirmPassword)) {
      return setError("Passwords does not match");
    }

    if (!isPasswordStrong(newPassword)) {
      return setError("Password is weak");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const setNewPass = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await api.patch(
        `/user/change-pass/${user.id}`,
        setNewPass
      );

      if (response.status === 200) {
        Swal.fire(
          "New Password Updated",
          "Your old password have been changed",
          "success"
        );

        setError("");
        setServerError("");
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
      }
    } catch (error) {
      setServerError(error.response.data.message);
    }
  }

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
    <div className="document bg-light-gray transition-all duration-300 | md:ml-[70px] | xl:ml-[330px]">
      <div className="flex flex-col justify-start items mt-6">
        {!changePassOpen && (
          <div
            onClick={() => setChangePassOpen(!changePassOpen)}
            className="bg-white flex flex-row justify-between items-center mx-5 px-4 mb-4 rounded-xl max-w-sm hover:bg-[#0D89C77f] hover:cursor-pointer"
          >
            <div className="text-left text-2xl font-bold py-4">
              Change Password
            </div>
            <KeyboardArrowRightIcon fontSize="large" />
          </div>
        )}
        {changePassOpen && (
          <div className="bg-white flex flex-col justify-center m-5 rounded-xl max-w-sm relative">
            <ClearIcon
              className="absolute top-5 right-5 hover:cursor-pointer hover:opacity-60"
              onClick={() => setChangePassOpen(!changePassOpen)}
            />
            <div className="text-center text-2xl font-bold py-4">
              Change Password
            </div>
            <div className="text-center pb-4">
              <img
                alt="Lock"
                src="https://i.imgur.com/It0rPOW.png"
                className="text-center h-44 w-44 mx-auto"
              />
            </div>

            <form onSubmit={savePassword}>
              <div className="px-4 pt-2 | md:w-full">
                <label className="text-sm">Current Password</label> <br />
                <input
                  type="password"
                  className="border-2 border-dark-blue rounded-lg p-2 h-9 w-full "
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="px-4 | md:pt-2 md:w-full">
                <label className="text-sm">New Password</label> <br />
                <input
                  type="password"
                  className="border-2 border-dark-blue rounded-lg p-2 h-9 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="px-4 | md:pt-2 md:w-full">
                <label className="text-sm">Confirm New Password</label> <br />
                <input
                  type="password"
                  className="border-2 border-dark-blue rounded-lg p-2 h-9 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <h4 className="text-red-600 font-semibold mt-1">
                  {error ? error : serverError}
                </h4>
              </div>

              <div className="flex justify-end m-4 mb-7">
                <button
                  type="submit"
                  className="bg-dark-blue text-white px-4 py-2 rounded-md hover:bg-slate-500 hover:text-dark-blue"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        )}
        {!smsNotifOpen && (
          <div
            onClick={() => setSmsNotifOpen(!smsNotifOpen)}
            className="bg-white flex flex-row justify-between items-center mx-5 px-4 mb-4  rounded-xl max-w-sm hover:bg-[#0D89C77f] hover:cursor-pointer"
          >
            <div className="text-left text-2xl font-bold py-4">
              SMS Notification
            </div>
            <KeyboardArrowRightIcon fontSize="large" />
          </div>
        )}
        {smsNotifOpen && (
          <div className="bg-white flex flex-col justify-center m-5 rounded-xl max-w-sm relative">
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
        )}
      </div>
    </div>
  );
}
export default Settings;
