import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoginLoader = () => {
  return (
    <div>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="23"
        visible={true}
      />
    </div>
  );
};

export default LoginLoader;
