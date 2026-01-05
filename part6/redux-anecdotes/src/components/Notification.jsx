import { useSelector } from "react-redux";

const Notification = () => {
  const selector = useSelector(({ noti }) => noti);

  return (
    <div>
      {selector.map((sl) => (
        <div key={sl.message} style={{ color: "green" }}>
          {sl.display ? sl.message : ""}
        </div>
      ))}
    </div>
  );
};

export default Notification;
