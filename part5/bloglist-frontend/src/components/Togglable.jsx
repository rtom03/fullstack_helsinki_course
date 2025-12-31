import React, { useState } from "react";

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const hideVissibility = { display: visible ? "none" : "" };
  const showVisibility = { display: visible ? "" : "none" };
  const toggleButton = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div style={hideVissibility}>
        <button onClick={toggleButton}>Create Blog</button>
      </div>

      <div style={showVisibility}>
        {children}
        <button onClick={toggleButton}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
