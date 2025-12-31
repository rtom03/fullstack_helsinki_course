import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  setPassword,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submits">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
