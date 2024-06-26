import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import SuperAdmin from "./components/super-admin/SuperAdmin";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/medical-staff/StaffDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "./api/UserContext";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      {user && <Navbar />}

      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {user && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          s
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={["Super Admin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-staff"
            element={
              <ProtectedRoute allowedRoles={["Medical Staff"]}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={`/${user.user_type.replace(" ", "-").toLowerCase()}`}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
