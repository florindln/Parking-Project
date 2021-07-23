import React, { Component } from "react";

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="footer-text">Created by Certiorem.</span>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;
