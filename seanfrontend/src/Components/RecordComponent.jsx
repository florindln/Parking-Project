import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ListRecordsComponent from "./ListRecordsComponent";

const RecordComponent = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>You must login to see agenda.</h2>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <ListRecordsComponent />
      </div>
    )
  );
};

export default RecordComponent;
