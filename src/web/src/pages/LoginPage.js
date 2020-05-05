import React from "react";
const env = require("../env");

function LoginPage({ player, ...props }) {
  return (
    <form action={`${env.API_URL}/api/login`} method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginPage;
