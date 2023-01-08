import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Spinner({ loading }) {
  return (
    <div className=" flex justify-center items-center h-screen">
      <HashLoader
        color={"#64F58D"}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
