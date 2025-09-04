const ErrorNoti = ({ message }) => {
  return (
    <div style={{ background: "white", color: "red", borderColor: "red" }}>
      <header>{message}</header>
    </div>
  );
};

export default ErrorNoti;
