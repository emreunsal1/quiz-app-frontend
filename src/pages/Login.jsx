import React, { useState } from "react";
import { userLoginController } from "./../functions/databaseFunctions";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = async () => {
    const response = await userLoginController(userName, password);
    console.log(response);
  };
  return (
    <div>
      <div className="login-container">
        <input
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={userLogin}>Login</button>
      </div>
    </div>
  );
}
