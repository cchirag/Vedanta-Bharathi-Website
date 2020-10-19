import React, { useEffect, useState } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { auth } from "./Services/firebase.service";
import AuthenticationPage from "./Pages/AuthenticationPage";
import AddShlokaPage from "./Pages/AddShlokaPage";
import AddEventPage from "./Pages/AddEventPage";
import AddLinkPage from "./Pages/AddLinkPage";
import AddThoughtOfTheDayPage from "./Pages/AddThoughtOfTheDayPage";
import "react-activity/dist/react-activity.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } else {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/authentication"></Redirect>}
      ></Route>
      <Route
        path="/authentication"
        render={() =>
          isAuthenticated ? (
            <Redirect to="/addShloka"></Redirect>
          ) : (
            <AuthenticationPage></AuthenticationPage>
          )
        }
      ></Route>
      <Route
        path="/addShloka"
        render={() => {
          if (isAuthenticated) {
            return <AddShlokaPage></AddShlokaPage>;
          } else {
            return <AuthenticationPage></AuthenticationPage>
          }
        }}
      ></Route>
      <Route
        path="/addEvent"
        render={() => {
          if (isAuthenticated) {
            return <AddEventPage></AddEventPage>;
          } else {
            return <AuthenticationPage></AuthenticationPage>
          }
        }}
      ></Route>
      <Route
        path="/addLink"
        render={() => {
          if (isAuthenticated) {
            return <AddLinkPage></AddLinkPage>;
          } else {
            return <AuthenticationPage></AuthenticationPage>
          }
        }}
      ></Route>
      <Route
        path="/addThought"
        render={() => {
          if (isAuthenticated) {
            return <AddThoughtOfTheDayPage></AddThoughtOfTheDayPage>;
          } else {
            return <AuthenticationPage></AuthenticationPage>
          }
        }}
      ></Route>
    </Switch>
  );
}

export default App;
