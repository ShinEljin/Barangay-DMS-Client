import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Otp from "./pages/Login/Otp";
import RegSuccess from "./pages/Login/RegSuccess";
import ForgotPass from "./pages/Login/ForgotPass";
import NewPass from "./pages/Login/NewPass";
import LoggedIn from "./pages/Login/LoggedIn";

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
