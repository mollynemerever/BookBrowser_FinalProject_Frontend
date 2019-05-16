import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <p> homepage </p>
        </main>
      </div>
    );
  }
}
