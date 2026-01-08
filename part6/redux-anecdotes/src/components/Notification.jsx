import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  // const selector = useSelector(({ noti }) => noti);

  const { notification } = useContext(NotificationContext);
  console.log(notification);
  return (
    <div>
      {notification && (
        <div style={{ color: "green" }}>{notification ? notification : ""}</div>
      )}
    </div>
  );
};

export default Notification;
