import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/DMS/Dashboard";
import Requests from "./pages/DMS/Requests";
import Claiming from "./pages/DMS/Claiming";
import Logs from "./pages/DMS/Logs";
import Records from "./pages/DMS/Records";
import Settings from "./pages/DMS/Settings";
import NavBars from "./components/DMS/NavBars";

import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";

function App() {
  const { user } = useAuthContext();
  const [tab, setTab] = useState("Dashboard");

  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={user ? <Navigate to="/user/dashboard" /> : <Login />}
          />
        </Route>
        <Route
          path="/user"
          element={
            user ? <NavBars tab={tab} setTab={setTab} /> : <Navigate to="/" />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="claiming" element={<Claiming />} />
          <Route path="logs" element={<Logs />} />
          <Route path="records" element={<Records />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
