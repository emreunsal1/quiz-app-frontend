import React from "react";
import { Link } from "react-router-dom";

export default function GameLogin() {
  return (
    <div>
      <Link to={"/login"}>TeacherLogin</Link>
      <br />
      <Link to={"/keylogin"}>Game Login</Link>
    </div>
  );
}
