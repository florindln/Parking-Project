import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BinderComponent = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          You must login to see home page.
        </h2>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <h1>Welcome</h1>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default BinderComponent;
