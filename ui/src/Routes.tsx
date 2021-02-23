import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import DefaultLayout from "./Components/Layouts/Default";
import Login from "./Components/Login/login";
import PostProperty from "./Components/Property/Post";
import ListProperty from "./Components/Property/List";
import DetailsProperty from "./Components/Property/Details";
import GLogin from "./Components/GLogin/index";

function Index() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    window.location.href = "/list-property";
  }
  return <h2>Home</h2>;
}

function Routes() {
  return (
    <Router>
      <DefaultLayout>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
        <Route path="/post-property" component={PostProperty} />
        <Route path="/list-property" component={ListProperty} />
        <Route path="/property/:id" component={DetailsProperty} />
        <Route path="/google-success/:sid/:nid" component={GLogin} />
      </DefaultLayout>
    </Router>
  );
}

export default Routes;
