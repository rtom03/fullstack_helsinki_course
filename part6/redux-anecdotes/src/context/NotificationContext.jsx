import { useReducer, createContext } from "react";

const notifcationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.payload;
    case "NULLIFY":
      return null;
    default:
      break;
  }
};
const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notifcationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export { NotificationContextProvider };
