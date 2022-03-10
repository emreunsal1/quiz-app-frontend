import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLoginController } from "./../../functions/axiosFunctions";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(true);

  const history = useHistory();

  const userLogin = async () => {
    const response = await userLoginController(userName, password);
    if (!response) {
      return setIsUser(response);
    }
    localStorage.setItem("token", JSON.stringify(response));
    history.push("/admin");
  };
  return (
    <div>
      <div className="login-container">
        <input placeholder="User Name" onChange={(e) => setUserName(e.target.value)}></input>
        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={userLogin}>Login</button>
        <Link to={"/register"}>register </Link>
      </div>
    </div>
  );
}
