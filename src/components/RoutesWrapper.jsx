import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "../pages/Auth/Login";
import MainPage from "../pages/Admin/MainPage";
import Register from "../pages/Auth/Register";
import React, { useEffect } from "react";
import { useAdminController, useAuth } from "../hooks/auth";
import GameLogin from "../pages/Auth/GameLogin";
import QuestionWrapper from "./QuestionWrapper";
import KeyLogin from "../pages/Student/KeyLogin";
import QuizMain from "../pages/Admin/QuizMain";
import WaitingRoom from "./../pages/Student/WaitingRoom";

export default function RoutesWrapper() {
  useAuth();
  useAdminController();
  return (
    <Switch>
      <Route path={"/register"}>
        <Register />
      </Route>
      <Route path={"/admin/questions/:listid"}>
        <QuestionWrapper />
      </Route>
      <Route path={"/admin"}>
        <MainPage />
      </Route>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/keylogin/"}>
        <KeyLogin />
      </Route>
      <Route path={"/quiz/:listid"}>
        <QuizMain />
      </Route>
      <Route path={"/waitingRoom/:username"}>
        <WaitingRoom />
      </Route>
      <Route path={"/"}>
        <GameLogin />
      </Route>
    </Switch>
  );
}
