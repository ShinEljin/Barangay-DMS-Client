import { useState } from "react";
import Swal from "sweetalert2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import api from "../../../api/index";
import {
  isPasswordStrong,
  isPasswordsMatch,
} from "../../../validation/validation";

function ChangePassword({ changePassOpen, setChangePassOpen }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);

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

  return (
    <div className="bg-white flex flex-col justify-center m-5 mt-0 rounded-xl max-w-sm relative">
      <KeyboardArrowDownIcon
        fontSize="large"
        className="absolute top-4 right-4 hover:cursor-pointer "
        onClick={() => setChangePassOpen(!changePassOpen)}
      />
      <div
        className="text-center text-2xl font-bold py-4 hover:bg-[#0D89C77f] hover:rounded-t-xl hover:cursor-pointer"
        onClick={() => setChangePassOpen(!changePassOpen)}
      >
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
  );
}

export default ChangePassword;
