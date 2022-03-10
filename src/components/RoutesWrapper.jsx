import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "../pages/Auth/Login";
import MainPage from "../pages/Admin/MainPage";
import Register from "../pages/Auth/Register";
import React, { useEffect } from "react";
import { useAdminController, useAuth } from "../hooks/auth";
import GameLogin from "../pages/Auth/GameLogin";

export default function RoutesWrapper() {
  useAuth();
  useAdminController();
  return (
    <Switch>
      <Route path={"/register"}>
        <Register />
      </Route>
      <Route path={"/admin"}>
        <MainPage />
      </Route>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/"}>
        <GameLogin />
      </Route>
    </Switch>
  );
}
