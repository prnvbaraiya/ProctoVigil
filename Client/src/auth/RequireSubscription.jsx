import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { isSubsciber } from "../common/Methods";

const RequireSubscription = () => {
  const location = useLocation();
  const [isValid, setIsValid] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await isSubsciber();
      setIsValid(res);
    };
    getData();
  }, []);

  return isValid ? (
    <Outlet />
  ) : (
    <>
      {alert("Buy subsciption First")}
      <Navigate to="/teacher/payment" state={{ from: location }} replace />
    </>
  );
};

export default RequireSubscription;
