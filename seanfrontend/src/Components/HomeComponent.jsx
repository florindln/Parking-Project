import React, { Component } from "react";
import BinderComponent from "../Components/BinderComponent";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
       <BinderComponent/>
      </div>
    );
  }
}

export default HomeComponent;