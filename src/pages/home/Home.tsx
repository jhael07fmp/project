import React, { useEffect } from "react";
import { auth } from "../../config/firebase";
import * as router from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    if (!auth.currentUser) {
      window.location.href = "/login";
    }
  }, []);

  return <div className="container">Home</div>;
};
