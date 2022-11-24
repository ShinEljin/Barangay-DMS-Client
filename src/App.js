import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import LoggedIn from "./pages/Login/LoggedIn";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/">
        <Route index element={user ? <LoggedIn /> : <Navigate to="/login" />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="logged-in"
          element={user ? <LoggedIn /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
