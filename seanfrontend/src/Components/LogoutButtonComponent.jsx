import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButtonComponent = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        style={{ float: "right" }}
        className="btn btn-danger"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    )
  );
};

export default LogoutButtonComponent;
