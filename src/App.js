import "./styles.css";
import React from "react";
import AddMovieDialog from "./app/Components/AddMovieDialog/AddMovieDialog";
import EditMovieDialog from "./app/Components/EditMovieDialog/EditMovieDialog";
import DeleteMovieDialog from "./app/Components/DeleteMovieDialog/DeleteMovieDialog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./app/Pages/PageNotFound/PageNotFound";
import HomePage from "./app/Pages/HomePage/HomePage";
import { hot } from 'react-hot-loader';

const App = () => ( 
  <Router>
    <AddMovieDialog />
    <EditMovieDialog />
    <DeleteMovieDialog />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/search/:keyword" component={HomePage} />
      <Route path="/film/:id" component={HomePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Router>
);

export default hot(module)(App);


