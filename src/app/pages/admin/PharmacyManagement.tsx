import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PharmacyManagement } from "../../Components/dashboard/admin/PharmacyManagement";

export const PharmacyManagementPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || (userType !== "admin" && userRole !== "admin")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <PharmacyManagement />;
};
