import { useSelector } from "react-redux";

const Notification = () => {
  const selector = useSelector(({ noti }) => noti);
  console.log(selector);
  return (
    <div>
      {selector && (
        <div key={selector.content} style={{ color: "green" }}>
          {selector ? selector : ""}
        </div>
      )}
    </div>
  );
};

export default Notification;
