import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewUser } from "../../functions/axiosFunctions";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerUser = async () => {
    const data = await createNewUser(userName, password);
    if (!data) {
      return window.alert("kullanıcı adından mevcut");
    }
    localStorage.setItem("token", JSON.stringify(data));
    history.push("/admin");
  };

  return (
    <div>
      <div className="register-container">
        <input placeholder="User Name" onChange={(e) => setUserName(e.target.value)}></input>
        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
}
