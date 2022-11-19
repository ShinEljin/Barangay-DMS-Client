import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import RegSuccess from "./pages/RegSuccess";
import ForgotPass from "./pages/ForgotPass";
import NewPass from "./pages/NewPass";
import LoggedIn from "./pages/LoggedIn";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="otp" element={<Otp />} />
        <Route path="reg-success" element={<RegSuccess />} />
        <Route path="forgot" element={<ForgotPass />} />
        <Route path="new-pass" element={<NewPass />} />
        <Route path="logged-in" element={<LoggedIn />} />
      </Route>
    </Routes>
  );
}

export default App;
