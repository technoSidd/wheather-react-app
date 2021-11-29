import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
// import Counters from "./components/counters";
import Home from "./components/home";
import React, { Component } from "react";
import Result from "./components/result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "./components/favourite";

class App extends React.Component {
  render() {
    return (
      // <React.Fragment>
      //   <Navbar />
      //   <main className="container">
      //     <Home />
      //   </main>
      // </React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
        {/* <main className="container">
          <Home />
        </main> */}
      </Router>
    );
  }
}

export default App;
