import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManagement } from "../../Components/dashboard/UserManagement";

export const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || (userType !== "admin" && userRole !== "admin")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <UserManagement />;
};
